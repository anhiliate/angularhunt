import { AppState } from './index';
import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/let';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { createSelector } from 'reselect';

import * as fromProjects from './projects.reducer';
import * as fromUsers from './user.reducer';

// Entire State of a App
export interface AppState {
    projects:      fromProjects.State;
    users:         fromUsers.State;
}

// Export all the reducers
export default compose(combineReducers)({
    projects:      fromProjects.projectReducer,
    users:         fromUsers.userReducer,
});



/**Retrive Projects from ProjectState */
export const getProjectsState = (appState: AppState) => appState.projects;
export const getProjectsEntities = createSelector(getProjectsState, fromProjects.getEntities);
export const getProjectsIds = createSelector(getProjectsState, fromProjects.getIds);
export const getProjects = createSelector(getProjectsEntities, getProjectsIds, (projects, ids) => {
  return ids.map(id => projects[id]);
});

export const getSelectedProjectId = createSelector(getProjectsState, fromProjects.getSelectedProjectId);
export const getSelectedProject = createSelector(getProjectsEntities, getSelectedProjectId, (projects, id) => {
  return projects[id];
});


/**Retrive Users */
export const getUsersState = (appState: AppState) => appState.users;

export const getCurrentUser = createSelector(getUsersState, fromUsers.getUser);
