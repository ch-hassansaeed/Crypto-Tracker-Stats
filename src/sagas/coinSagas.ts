import { call, put, takeLatest, fork } from "redux-saga/effects";
import * as coinServices from "../services/coinServices";
import { Actions as coinActions } from "../actions/coinActions";
import { AxiosResponse } from "axios";

function* coinsWorker({ payload }: any) {
  yield put({
    type: coinActions.FETCH_COINS_REQUEST_LOADING,
  });
  try {
    const data: AxiosResponse<any[]> = yield call(
      coinServices.fetchCoins,
      payload,
    );
    yield put({
      type: coinActions.FETCH_COINS_REQUEST_SUCCESS,
      payload: { data, page: payload.page },
    });
  } catch (error) {
    yield put({
      type: coinActions.FETCH_COINS_REQUEST_FAIL,
      payload: { error, page: payload.page },
    });
  }
}

function* coinsWatcher() {
  yield takeLatest(coinActions.FETCH_COINS_REQUEST, coinsWorker);
}

function* coinDetails({ payload }: any) {
  yield put({
    type: coinActions.FETCH_COIN_DETAILS_LOADING,
  });
  try {
    const coinData: AxiosResponse<any[]> = yield call(
      coinServices.fetchCoinDetails,
      payload,
    );
    yield put({
      type: coinActions.FETCH_COIN_DETAILS_REQUEST_SUCCESS,
      payload: {
        data: coinData,
        id: payload.id,
      },
    });
  } catch (error) {
    yield put({
      type: coinActions.FETCH_COIN_DETAILS_REQUEST_FAIL,
      payload: { error, id: payload.id },
    });
  }
}

function* coinDetailsWorker({ payload }: any) {
  yield fork(coinDetails, { payload });
  yield fork(coinChartDataWorker, { payload: { ...payload, days: 1 } });
}

function* coinDetailsWatcher() {
  yield takeLatest(coinActions.FETCH_COIN_DETAILS_REQUEST, coinDetailsWorker);
}

function* coinChartDataWorker({ payload }: any) {
  yield put({
    type: coinActions.FETCH_COIN_CHART_DATA_LOADING,
  });
  try {
    const data: AxiosResponse<any[]> = yield call(
      coinServices.fetchCoinChartData,
      payload,
    );
    yield put({
      type: coinActions.FETCH_COIN_CHART_DATA_REQUEST_SUCCESS,
      payload: { data, id: payload.id, days: payload.days },
    });
  } catch (error) {
    yield put({
      type: coinActions.FETCH_COIN_CHART_DATA_REQUEST_FAIL,
      payload: { error, id: payload.id },
    });
  }
}

function* coinChartDataWatcher() {
  yield takeLatest(
    coinActions.FETCH_COIN_CHART_DATA_REQUEST,
    coinChartDataWorker,
  );
}

const sagaWatchers = [
  coinsWatcher(),
  coinDetailsWatcher(),
  coinChartDataWatcher(),
];

export default sagaWatchers;
