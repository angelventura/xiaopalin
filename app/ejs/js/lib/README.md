## 2021/08/10 GULP 4
* Some minor comments

## 2021/05/28 GULP 4
* widget/abstract-url-search-widget.js

## 2021/05/20 GULP 4
* session-persistence-service.js
* big-data-access.js
* abstract-datatable-tab.js: to add a function instead of one url to
  be used with big-data-access
* element.js: getEventdata()
* url.js: small fix

## 2021/04/30 GULP 4
* lib/partial/display-partials.js

## 2021/03/19 GULP 4
* element: El.subscriveEnterHit EL.subscriveEscapeHit Some fixes

## 2021/03/18 GULP 4
* element: El.subscriveEnterHit EL.subscriveEscapeHit

## 2021/02/27 GULP 4
* element: El.display

## 2021/02/25 GULP 4
* abstract-datatable-tab.js: parseData.bind(that)

## 2021/01/26 Migrated to GULP 4

## 2020/12/18
* Cloaseable Error Fixed!
* lib/log.js: Parent trace was not written

## 2020/12/16
* lib/error.js: minor k3
* lib/obj.js: minor k3

## 2020/11/20
* lib/obj.js: Created stringify method

## 2020/08/27
* lib/reports/abstract-json-generated-file.js: new setFileName

## 2020/08/26
* lib/background-task.js: added the function pospone to pospone the current call.


## 2020/08/25
* lib/reports/abstract-json-generated-file.js: new

* lib/file/abstract-filereader.js: new
* lib/file/json-filereader.js: new
* lib/file/drop-zone.js: new

*	modified:   lib/file/CSVFileReader.js: extends from abstract-filereader
*	modified:   lib/reports/abstract-report.js: Minor
*	modified:   lib/services/session-persistence-service.js: Minor

	

## 2020/08/21
* lib/element.js: getEventEl();
* lib/background-task.js new background taks
* lib/services/session-persistence-service.js The return of the this.getDefaultValue(); will be stored.

## 2020/08/20
* Added Ajax.getAjaxUrl to be used as {{ajax-url '/admin/swagger/'}} into lib/partial/display-helpers.js

## 2020/07/16
* partial/closeable-partial.js: Fixed closeable flag

## 2019/11/26
* lib/log.js: minor modification to clarify messages
    
## 2019/11/16
* lib/widget/abstract-datatable-widget.js: Added common function from table
* lib/element.js: Prevent and stops propagation
    
## 2019/11/16
* lib/obj.js: Minor modifications    

## 2019/11/11
* lib/file : new API to read local files.
    

## 2019/10/11
* lib/browser-history.js: History back bug
    
## 2019/10/08
* Object addictiona lfunctions
* abstract-refresh-display-tab: this.data error
* abstract-datatable-tab.js: enableRowsClickRedirect. This also discober one problem on initialization
    
## 2019/10/07
* partial/closeable-partial.js: toggle ussing the class not the storagem this does not work
    
## 2019/10/01
* abstract-url-input-widget.pushInputValueToUrl

    
## 2019/09/24
* More doc
* Bug into view/abstract-refresh-tab.asyncInitEvents    

## 2019/09/23
* Started datatables widgets: lib/widget/abstract-datatable-widget.js
    
## 2019/09/18
* lib/widget/abstract-url-widget.js
* lib/widget/abstract-url-input-widget.js

            
## 2019/09/13:
* Minor code clean up

## 2019/09/06:
* js/lib/obj.js: same obj utilities.
* js/lib/log.js: minor cleanup
* abstract-simple-datatable: Added functions to get the row data.

    
## 2019/09/04:
* Added clickEvent and subscriveEvent into to the datatables
* More doc added: lib/view/README.md

## 2019/09/04:
* More doc added: lib/view/README.md

## 2019/08/13:
* clickEvent and subscriveEvent into abstract-tab

## 2019/08/08:  abstract-datatable-tab
* Set the loading wheel during the ajax call.
* Added buttonEventAndReload.
* enableRowsChild is no more madatory to work


2019/07/24:  BrowserHistory.removeParameter
2019/07/24:  Datatables modifications to allow to modify the url of the ajax call
    
* 19/07/2019 Fixed BrowserHistory     
* 16/07/2019 Added a handlebars helper {{#ifCond var1 '==' var2}}
* 16/07/2019 New version of browser-history.js
* 04/07/2019 Adding a non bloking preload into class -> abstract-refresh-template-tab.js
    
* 22/06/2019 Adding a non bloking preload into class -> abstract-refresh-display-tab.js


* 08/06/2019 Cleanup in the view modules
    
    
* Some doc added into the: lib/services/session-persistence-service.js. serialise and deserialize methods for dates
    
Version 0.0.3
- Additional logs added

Version 0.0.2
- New: services/cache-url.js
    
Version 0.0.1

test: Clean of the views added the initEvent method
 - view/README.md

Version 0.0.0 -> version in to the package.json
            
tsc: lib/widget/abstract-display-widget.js
    
tsc: partial/display-helpers.js dateRelative
tsc: view/abstract-datatable-tab.js: enableRowsChild(f,v,selector)
    A Function that avoid open the row of the table if not wanted.
    More helpers fpor dates and to trunk strings
