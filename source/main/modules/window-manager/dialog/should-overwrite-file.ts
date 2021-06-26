/**
 * @ignore
 * BEGIN HEADER
 *
 * Contains:        shouldOverwriteFileDialog
 * CVM-Role:        Utility function
 * Maintainer:      Hendrik Erz
 * License:         GNU GPL v3
 *
 * Description:     Displays a confirmatory dialog
 *
 * END HEADER
 */

import { BrowserWindow, dialog, MessageBoxReturnValue } from 'electron'
import { trans } from '../../../../common/i18n-main'

/**
 * Asks the user if the file identified by filename should be overwritten
 *
 * @param   {BrowserWindow|null}  win       The window to attach to
 * @param   {string}              filename  The filename
 *
 * @return  {Promise<boolean>}              Returns to true if the user agrees
 */
export default async function shouldOverwriteFileDialog (win: BrowserWindow|null, filename: string): Promise<boolean> {
  let options = {
    type: 'question',
    title: trans('system.overwrite_file_title'),
    message: trans('system.overwrite_file_message', filename),
    buttons: [
      trans('system.cancel'),
      trans('system.ok')
    ],
    cancelId: 0,
    defaultId: 1
  }

  // showMessageBox returns a Promise, resolves to:
  let response: MessageBoxReturnValue
  // DEBUG: Testing out to never make dialogs modal in response to issue #1645
  // Currently, we only make dialogs modal on macOS and Windows.
  if (win !== null && [ 'darwin', 'win32' ].includes(process.platform)) {
    response = await dialog.showMessageBox(win, options)
  } else {
    response = await dialog.showMessageBox(options)
  }

  return response.response === 1
}
