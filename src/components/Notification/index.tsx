import { useEffect, useState } from "react"
import { createRoot } from "react-dom/client"
import "./index.scss"

type typeNotyfi = "success" | "error" | "info" | "warning"

interface INotification {
  title: string,
  type: typeNotyfi,
  onClose?: () => void,
  description?: string,
  duration?: number
}

const Notification = ({ title, type, onClose, description, duration = 3000 }: INotification) => {
  const [visible, setVisible] = useState<boolean>(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration)
    return () => clearTimeout(timer)
  }, [duration])

  useEffect(() => {
    if (!visible) onClose?.()
  }, [visible, onClose])

  if (!visible) return null

  return (
    <div className={`notification ${type}`}>
      <div className="notification-title">{title}</div>
      {description && <div className="notification-description">{description}</div>}
    </div>
  )
}

let container: HTMLElement | null = null;

export const notify = (prop: INotification) => {
  if (!container) {
    container = document.createElement("div")
    document.body.appendChild(container)
    container.className = "notification-wrapper"
  }

  const notifyDiv = document.createElement("div")
  container.prepend(notifyDiv)

  const root = createRoot(notifyDiv)

  const onClose = () => {
    setTimeout(() => {
      root.unmount()
      notifyDiv.remove()
      if (container && container.childElementCount === 0) {
        container.remove()
        container = null
      }
    }, 0)
  }

  root.render(<Notification {...prop} onClose={onClose} />)

}

