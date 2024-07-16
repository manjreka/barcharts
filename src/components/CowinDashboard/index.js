import {Component} from 'react'

import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccineByAge from '../VaccinationByAge'
import VaccineByGender from '../VaccinationByGender'

import './index.css'

const apiStatus = {
  success: 'success',
  failure: 'failure',
  loading: 'loading',
}

class CowinDashboard extends Component {
  state = {
    apiStatusView: apiStatus.loading,
    vaccineCoverageList: [],
    vaccineByAgeList: [],
    vaccineByGenderList: [],
  }

  componentDidMount() {
    this.getVaccinationInformation()
  }

  apiCallSuccess = data => {
    const dataToRender = {
      last7DaysVaccination: data.last_7_days_vaccination,
      vaccinationByAge: data.vaccination_by_age,
      vaccinationByGender: data.vaccination_by_gender,
    }
    console.log(dataToRender)

    const convertedVaccinationCoverageData = dataToRender.last7DaysVaccination.map(
      each => ({
        dose1: each.dose_1,
        dose2: each.dose_2,
        vaccineDate: each.vaccine_date,
      }),
    )

    console.log(convertedVaccinationCoverageData)

    const convertedVaccinationByAge = dataToRender.vaccinationByAge

    const convertedVaccinationByGender = dataToRender.vaccinationByGender

    this.setState({
      vaccineCoverageList: convertedVaccinationCoverageData,
      vaccineByGenderList: convertedVaccinationByGender,
      vaccineByAgeList: convertedVaccinationByAge,
      apiStatusView: apiStatus.success,
    })
  }

  apiCallFailure = () => {
    this.setState({apiStatusView: apiStatus.failure})
  }

  getVaccinationInformation = async () => {
    const url = ' https://apis.ccbp.in/covid-vaccination-data'

    const response = await fetch(url)
    console.log(response)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      this.apiCallSuccess(data)
    } else {
      this.apiCallFailure()
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderSuccessView = () => {
    const {
      vaccineCoverageList,
      vaccineByAgeList,
      vaccineByGenderList,
    } = this.state

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
          alt="website logo"
        />
        <h1>coWIN Vaccination in India</h1>
        <VaccinationCoverage data={vaccineCoverageList} />
        <VaccineByGender data={vaccineByGenderList} />
        <VaccineByAge data={vaccineByAgeList} />
      </div>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  render() {
    const {apiStatusView} = this.state

    switch (apiStatusView) {
      case 'success':
        return this.renderSuccessView()
      case 'failure':
        return this.renderFailureView()
      case 'loading':
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default CowinDashboard
