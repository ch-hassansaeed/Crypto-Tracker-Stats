import { all } from "redux-saga/effects";
import coinSaga from "./coinSagas";
export default function* rootSaga() {
  yield all([...coinSaga]);
}
