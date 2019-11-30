﻿/* html component ids */
const COLUMN_CATEGORY_TEXT = "text";      // text, str, char etc.
const COLUMN_CATEGORY_NUMERIC = "numeric";  // int, decimal, float, bit etc.
const COLUMN_CATEGORY_DATE = "date";      // date, datetime, time etc.

// column info (returned from MVC) properties
const COLUMN_INFO_NAME = "name";
const COLUMN_INFO_CATEGORY = "category";

var mainTableSelect = '#mainTableSelect';
var columnSelect = '#columnSelect';
var operatorSelect = '#operatorSelect';
var columnFilterText = '#columnFilterText';
var filterCriteriaText = '#filterCriteriaText';
var columnInfoArr;     // create placeholder

/* MVC urls */
var initialScreenDataUrl = '/Home/InitialScreenData';
var addFilterUrl = '/Home/AddFilter';

$(document).ready(function () {

    GetJsonAsync(initialScreenDataUrl, null, SetupInitialScreen);

});

function SetupInitialScreen(data, textStatus, xhr) {
    FillSelect($(mainTableSelect), data.allTables);
    columnInfoArr = data.columns;
    var test = SearchArray(columnInfoArr, "GroupName", COLUMN_INFO_NAME, COLUMN_INFO_CATEGORY);
    alert(test);
    FillSelectByProperty($(columnSelect), data.columns, COLUMN_INFO_NAME);
    FillSelect($(operatorSelect), data.operators);


}

function AddFilter() {
    var newFilter = $(columnFilterText).val();
    if ($(columnSelect).val() && $(operatorSelect).val() && newFilter) {

        var data = { table: $(mainTableSelect).val(), column: $(columnSelect).val(), filterOperator: $(operatorSelect).val(), newFilter: newFilter, currentFilters: $(filterCriteriaText).val() };

        var result = GetJsonSync(addFilterUrl, data);
        $(filterCriteriaText).val(result);
    }
    else {
        alert("Column/Operator/Filter not selected");
    }
}
//function FillMainSelect(data, textStatus, xhr) {
//    FillSelect($('#mainTableSelect'), data);
//}

//function GetParentData() {
//    var tableName = '#parentDataTable';
//    var url = '/Home/GetParentTables';

//    // clear table header
//    ClearJQTableHeader(tableName);

//    //fill data table
//    FillJQTable(tableName, url, model);
//}

function ClearJQTableHeader(tableName) {
    // clear datatable header row before fill again
    // assumed table html will always have "<thead><tr></tr></thead>" initially

    var table;
    if ($.fn.dataTable.isDataTable(tableName)) {

        table = $(tableName).DataTable();
        table.destroy();
        $(tableName).find("thead").find("tr").empty();
    }
}

// fill jQuery datatable using passed table name, url and model
function FillJQTable(tableName, url, model) {
    $.ajax({
        type: "GET",
        url: url,
        data: model,
        dataType: "json",
        success: function (result) {
            var str;

            $.each(result.columns, function (k, colObj) {
                str = '<th>' + colObj.name + '</th>';
                $(str).appendTo(tableName + '>thead>tr');
            });

            $(tableName).DataTable(
                {
                    "data": result.data,
                    "columns": result.columns
                }
            );
        },
        error: function (error) {
            alert("ERROR: " + error);
        }
    });
}

function GetJsonAsync(url, data, callback) {
    $.ajax({
        type: "GET",
        url: url,
        data: data,
        dataType: "json",
        success: callback,
        error: function (error) {
            return "ERROR";
        }
    });
}

function GetJsonSync(url, data) {
    var result;

    $.ajax({
        type: "GET",
        url: url,
        data: data,
        async: false,
        dataType: "json",
        success: function (jsonResult) {
            result = jsonResult;
        },
        error: function (error) {
            return "ERROR";
        }
    });

    return result;
}

function FillSelectByProperty(selectObj, json, property) {
    // fills select using json
    $(selectObj).empty();
    $.each(json, function (i, element) {
        selectObj.append($('<option></option>').attr('value', element[property]).text(element[property]));
    });
}
function FillSelect(selectObj, json) {
    // fills select using json
    $(selectObj).empty();
    $.each(json, function (i, value) {
        selectObj.append($('<option></option>').attr('value', value).text(value));
    });
}

// searches array resturns required property
function SearchArray(arr, valueToSearch, searchProperty, returnProperty) {
    // fills select using json
    var foundElement = arr.find(obj => obj[searchProperty] === valueToSearch)[returnProperty];

    return foundElement;
}

