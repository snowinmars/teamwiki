const azureApi = {
    rootUrl: 'https://5bd43d84be3a0b0013d03506.mockapi.io/api/',
};

azureApi.getBranchesEnviromentBinding = azureApi.rootUrl + 'getBranchEnvBinding';
azureApi.tasksForUser = azureApi.rootUrl + 'tasksForUser';

const componentStatuses = {
    ok: 'ok',
    httpQueryFailed: 'httpQueryFailed',
    initializing: 'initializing',
}

export {
    azureApi,
    componentStatuses
}