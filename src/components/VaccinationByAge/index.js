import {PieChart, Pie, Legend, Cell} from 'recharts'
import './index.css'

const VaccineByAge = props => {
  const {data} = props

  return (
    <div>
      <h1>Vaccination by age</h1>

      <PieChart width={1000} height={1000}>
        <Pie
          cx="70%"
          cy="40%"
          data={data}
          startAngle={0}
          endAngle={360}
          innerRadius="0%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="18-44" fill="#fecba6" />
          <Cell name="44-60" fill="#b3d23f" />
          <Cell name="above 60" fill="#a44c9e" />
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

export default VaccineByAge
