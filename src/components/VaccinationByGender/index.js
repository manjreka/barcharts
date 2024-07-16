import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccineByGender = props => {
  const {data} = props

  return (
    <div>
      <h1>Vaccination by gender</h1>

      <PieChart width={1000} height={1000}>
        <Pie
          cx="70%"
          cy="40%"
          data={data}
          startAngle={0}
          endAngle={180}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="male" fill="#fecba6" />
          <Cell name="female" fill="#b3d23f" />
          <Cell name="others" fill="#a44c9e" />
        </Pie>
        <Legend
          iconType="circle"
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </PieChart>
    </div>
  )
}

export default VaccineByGender
