import { useEffect, useState } from "react";
import { getServices } from "../../../services/api/servicesApi";
import Select from "../../../components/Select";

const SelectServices = (props: {
  name: string,
  multiple?: boolean;
  placeholder?: string;
}) => {
  const { name, multiple = false, placeholder } = props
  const [data, setData] = useState<MService.IRecord[]>([])


  const dataOptions = data?.map(item => ({
    label: `${item.name}(${item.serviceCode})`,
    value: item.id
  }))

  useEffect(() => {
    getServices().then(res => setData(res.data ? res.data : []))
  }, [])

  return (
    <Select name={name} options={dataOptions} multiple={multiple} />
  )

}

export default SelectServices