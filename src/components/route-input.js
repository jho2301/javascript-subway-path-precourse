import Component from '../core/component.js';

class RouteInput extends Component {
  constructor($target, props) {
    super($target, props);
    this.render();
  }

  mountTemplate() {
    this._$target.innerHTML = `
			<div>
				<label for="departure-station"><strong>출발역</strong></label>
				<input name="departure-station" id="departure-station-name-input" />
			</div>
			<div>
				<label for="departure-station"><strong>도착역</strong></label>
				<input name="arrival-station" id="arrival-station-name-input" />
			</div>
			${this.createRadioButtonTemplate()}
			<button id="search-button">길 찾기</button>
    `;
  }

  createRadioButtonTemplate() {
    return `
			<form>
				<input type="radio" name="search-type" value="distance-first" checked> 최단거리
				<input type="radio" name="search-type" value="time-first"> 최소시간
			</form>
		`;
  }

  initializeEventListener() {
    this._$target.addEventListener('click', event => {
      if (event.target.id === 'search-button') {
        this.handleSubmitEvent();
      }
    });
  }

  handleSubmitEvent() {
    const departureStation = document
      .querySelector('#departure-station-name-input')
      ?.value.trim();
    const arrivalStation = document
      .querySelector('#arrival-station-name-input')
      ?.value.trim();
    const INPUT_ALERT_MESSAGE = '잘못된 입력입니다. 다시 입력해주세요.';
    if (!this.isValidInput(departureStation, arrivalStation)) {
      alert(INPUT_ALERT_MESSAGE);
      return;
    }
    this.setSearchRequest(departureStation, arrivalStation);
  }

  isValidInput(departureStation, arrivalStation) {
    const MINIMUM_INPUT_LENGTH = 2;
    return (
      departureStation.length >= MINIMUM_INPUT_LENGTH &&
      arrivalStation.length >= MINIMUM_INPUT_LENGTH
    );
  }

  setSearchRequest(departureStation, arrivalStation) {
    const { searchRequest } = this._props;
    const searchType = this.getSearchType();
    searchRequest.value = { departureStation, arrivalStation, searchType };
  }

  getSearchType() {
    const elements = document.querySelectorAll('input[name="search-type"]');
    let searchType = '';
    for (const element of elements) {
      if (element.checked) {
        searchType = element.value;
      }
    }

    return searchType;
  }
}

export default RouteInput;
