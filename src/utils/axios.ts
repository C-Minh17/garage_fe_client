import axios1 from 'axios';
import { deleteCookie, getCookie, setCookie } from './cookie';
import { notify } from '../components/Notification';
import { ipAuth } from './ip';

const axios = axios1.create({
  // baseURL: ipRoot,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// Biến để quản lý việc refresh token khi có nhiều request đồng thời
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

axios.interceptors.request.use(
  (config) => {
    const token = getCookie('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(` ${config.method?.toUpperCase()} ${config.url}`)
    return config
  },
  (error) => Promise.reject(error)
)

axios.interceptors.response.use(
  (response) => {
    return {
      ...response.data,
      success: true,
    }
  },

  async (error) => {
    const status = error?.response?.status;
    const data = error?.response?.data;
    const originalRequest = error?.config;
    const description = data?.message || "Có lỗi xảy ra";

    console.warn(`API Error [${status}] ${originalRequest?.url}:`, description);

    // Tránh retry khi gọi refresh API để tránh vòng lặp vô hạn
    if (originalRequest?.url?.includes('/auth/refresh')) {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest._retry) {
      const refreshToken = getCookie('refreshToken');

      if (refreshToken) {
        // Nếu đang refresh token, thêm request vào queue
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(token => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axios(originalRequest);
            })
            .catch(err => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Sử dụng ipAuth giống như các endpoint auth khác
          const refreshUrl = `${ipAuth}/refresh`;
          console.log('Đang refresh token tại:', refreshUrl);

          const res = await axios1.post(
            refreshUrl,
            {
              refreshToken: refreshToken
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            }
          );

          // Xử lý nhiều format response có thể có
          const responseData = res.data?.data || res.data;
          const newAccessToken = responseData?.accessToken || res.data?.accessToken;

          if (!newAccessToken) {
            console.error('Response không có accessToken:', res.data);
            throw new Error('Không nhận được accessToken từ server');
          }

          setCookie('accessToken', newAccessToken, 15);

          // Lưu refreshToken mới nếu có
          if (responseData?.refreshToken || res.data?.refreshToken) {
            const newRefreshToken = responseData?.refreshToken || res.data?.refreshToken;
            setCookie('refreshToken', newRefreshToken, 7 * 24 * 60);
          }

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          // Xử lý các request đang chờ
          processQueue(null, newAccessToken);
          isRefreshing = false;

          return axios(originalRequest);
        } catch (err: any) {
          console.error("Refresh token thất bại:", err);

          // Chỉ đăng xuất nếu thực sự là lỗi 401 hoặc token không hợp lệ
          const errorStatus = err?.response?.status;
          const isTokenInvalid = errorStatus === 401 || errorStatus === 403;

          // Xử lý các request đang chờ
          processQueue(err, null);
          isRefreshing = false;

          if (isTokenInvalid || !refreshToken) {
            deleteCookie('accessToken');
            deleteCookie('refreshToken');
            window.location.href = '/login';
          }

          return Promise.reject(err);
        }
      } else {
        console.log("Không có refresh token, yêu cầu đăng nhập lại");
        deleteCookie('accessToken');
        window.location.href = '/login';
        return Promise.resolve(null);
      }
    }

    switch (status) {
      case 400:
        notify({
          title: "Lỗi 400",
          type: "error",
          description: "Dữ liệu không hợp lệ."
        });
        break;

      case 403:
        notify({
          title: "Lỗi 403",
          type: "error",
          description: "Bạn không có quyền truy cập."
        });
        break;

      case 404:
        notify({
          title: "Lỗi 404",
          type: "error",
          description: "Không tìm thấy tài nguyên yêu cầu."
        });
        break;

      case 405:
        notify({
          title: "Lỗi 405",
          type: "error",
          description: "Phương thức không hợp lệ."
        });
        break;

      case 409:
        notify({
          title: "Lỗi 409",
          type: "warning",
          description: "Xung đột dữ liệu."
        });
        break;

      case 500:
      case 502:
      case 503:
        notify({
          title: "Lỗi server",
          type: "error",
          description: "Máy chủ gặp sự cố, vui lòng thử lại sau."
        });
        break;

      default:
        notify({
          title: "Lỗi không xác định",
          type: "error",
          description: "Vui lòng thử lại sau."
        });
    }

    return Promise.resolve({
      success: false,
      status,
      message: description,
      data: null,
    });
  }
)

export default axios


