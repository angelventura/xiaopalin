
# AbstractView: abstract-view.js
  - Elements: ${this.id}
  - Abstract Function: initialize,renderView
        
  - Handles the init that define if this page must or not be displayed -> init initialize
  - And handles the documentReady to display the view.
              
## abstract-tab.js: This hadle a "tab" page structure. A content and one menu
  - Child of AbstractView.
  - Elements: ${this.id}-content, menu-item-${this.id}
  - Abstract Function: display, asyncInitEvents, clickEvent, subscriveEvent
    
  - On renderView look for the ${this.id}-content if any:
  - Handle de content $(#tab-id-content) and the menu $(#menu-item-tab-id)
  - Use the renderView to call the display and the asyncInitEvents.
    
#### abstract-display-tab.js.
  - Child of abstract-tab
  - Elements: 
  - Abstract Function: loadData, initEvents

  - Compile the template on initialize
  - Uses a the data load and the template to display the content.
    
  - TODO: this load the data on the on display.
  - TODO: The initEvents is done after content displayed.

### abstract-refresh-tab.js
  - Child of abstract-tab
  - Elements: #${this.id}-refresh-button
  - Abstract Function: refresh
    
  - Handles a refresh button and a refresh function.

            
#### abstract-refresh-display-tab.js. Extends abstract-refresh-tab
  - Child of abstract-refresh-tab
  - Elements: #${this.id}-json, 
  - Abstract Function: loadData(firstCall)

  - SIMILAR TO abstract-display-tab but with refresh and JSON
        
  - Compile the template and load the data on initialize.      
  - To display data from JSON using a template.
  - Refresh and display the JSON schema for debugging purposes

##### abstract-refresh-display-element.js
  - Child of abstract-refresh-display-tab
  - Elements: .auto-popup -> Closeable
  - Abstract Function: 
  
    
#### abstract-refresh-template-tab.js. Extends abstract-refresh-tab
  - Child of abstract-refresh-tab
  - Elements: 
  - Abstract Function: loadData(firstCall),initEvents
    
  - Similar to abstract-refresh-display-tab.js but widthout the debug JSON format
  - TODO: Make a common class between abstract-refresh-template-tab.js and abstract-refresh-display-tab.js




# Deprecated
                        
* abstract-refresh-panel.js
@DEPRECATED
* abstract-view-content.js
@DEPRECATED


# DataTables

## abstract-datatable-tab.js
  - TOP datatables tab
  - Elements: 
    - Helper functions to display information to beused in the columns for the render function: dates, numbers, etc ...
  - Abstract Functions: initialize

  - TODO add the events

    ver los edits como funcionan
                 
## abstract-simple-datatable.js

  - Child of abstract-datatable-tab
  - Elements:
    - implements the displayDatatable, that creates a teble with the default values
    - impements one default parseServerData.
  - Abstract Functions:
     - initComplete: To be used when the datatable initialization success.
     - parseServerData: To parse the server data
    
  - This sim-plifys the datatable creation and use the list of columns


## abstract-tab-editor
    Create one child class of this one to edit the row elements.
    In the initComplete call the
       Editor.addEventListener(this.$datatable);
        
    
# Other
        
# abstract-datatable-tab.js, No parent
  - Uses: $(`#${this.id}-table`) m $("#menu-item-"+this.id)

                   
abstract-datatable-editor.js
abstract-tab-editor.js

abstract-refresh-form-element.js

    
    