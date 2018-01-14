import axios from 'axios';

export default function reduxAjax(requestAction, successAction, errorAction, axiosArgs) {
    return dispatch => {
        if (requestAction) {
            dispatch(requestAction(axiosArgs.params));
        }
        // do some stuff here, like handle auth token, etc
        return axios(axiosArgs).then((resp) => {
            if (successAction) {
                dispatch(successAction(resp));
            }
        }).catch((error) => {
            if (errorAction) {
                dispatch(errorAction(error));
            }
        });
    }
}