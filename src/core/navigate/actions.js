export const navigateActions = {
  CHANGE_LAYOUT_COLLAPSED: 'CHANGE_LAYOUT_COLLAPSED',
  UPDATE_PROCESS: 'UPDATE_PROCESS',

  changeLayoutCollapsed: payload => ({
    type: navigateActions.CHANGE_LAYOUT_COLLAPSED,
    payload: payload
  })
};