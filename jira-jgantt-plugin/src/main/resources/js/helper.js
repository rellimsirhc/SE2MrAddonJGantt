// ==UserScript==
// @name         Kanban Gantt
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://jira-test.odigeo.com/secure/RapidBoard.jspa?*
// @grant        none
// ==/UserScript==



(function(a) {
    function set_date_format() {
         jQuery.ajax({
            url: "/rest/api/2/application-properties?key=jira.lf.date.dmy",
            type: "GET",

            contentType: 'application/json; charset=utf-8',
            success: function(json) {
                //alert("OK: "+json.value);
                document.cookie="gantt-date-format="+json.value+"; path=/";
            },
            error : function(jqXHR, textStatus, errorThrown) {
                //alert("FATAL ERROR: No date-format found.");
            },

            timeout: 120000,
        });

    };

    function set_locale() {
         jQuery.ajax({
            url: "/rest/api/2/myself",
            type: "GET",

            contentType: 'application/json; charset=utf-8',
            success: function(json) {
                //alert("OK: "+json.locale);
                document.cookie="gantt-locale="+json.locale+"; path=/";
            },
            error : function(jqXHR, textStatus, errorThrown) {
                //alert("FATAL ERROR: No locale found.");
            },

            timeout: 120000,
        });

    };



    var pathname = window.location.pathname;
    if (pathname.indexOf("/secure/RapidBoard.jspa") >= 0 ) {
    set_date_format()
    set_locale()
    a(document).ready(function() {
        setTimeout(function() {
            a('<li><a class="aui-nav-item jgantt-enabled" data-link-id="hvqzao.jira-jgantt-plugin:sidebar-link-enabled" original-title=""><span class="aui-icon aui-icon-large" style="background:url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgd2lkdGg9IjIwcHgiCiAgIGhlaWdodD0iMjBweCIKICAgdmlld0JveD0iMCAwIDIwIDIwIgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmczNDA5IgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkxIHIxMzcyNSIKICAgc29kaXBvZGk6ZG9jbmFtZT0iYWN0aXZlLTEuc3ZnIj4KICA8bWV0YWRhdGEKICAgICBpZD0ibWV0YWRhdGEzNDI2Ij4KICAgIDxyZGY6UkRGPgogICAgICA8Y2M6V29yawogICAgICAgICByZGY6YWJvdXQ9IiI+CiAgICAgICAgPGRjOmZvcm1hdD5pbWFnZS9zdmcreG1sPC9kYzpmb3JtYXQ+CiAgICAgICAgPGRjOnR5cGUKICAgICAgICAgICByZGY6cmVzb3VyY2U9Imh0dHA6Ly9wdXJsLm9yZy9kYy9kY21pdHlwZS9TdGlsbEltYWdlIiAvPgogICAgICAgIDxkYzp0aXRsZT5yZXBvcnRzPC9kYzp0aXRsZT4KICAgICAgPC9jYzpXb3JrPgogICAgPC9yZGY6UkRGPgogIDwvbWV0YWRhdGE+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxIgogICAgIG9iamVjdHRvbGVyYW5jZT0iMTAwMDAiCiAgICAgZ3JpZHRvbGVyYW5jZT0iMTAwMDAiCiAgICAgZ3VpZGV0b2xlcmFuY2U9IjEwMDAwIgogICAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwIgogICAgIGlua3NjYXBlOnBhZ2VzaGFkb3c9IjIiCiAgICAgaW5rc2NhcGU6d2luZG93LXdpZHRoPSIxNTk2IgogICAgIGlua3NjYXBlOndpbmRvdy1oZWlnaHQ9IjczNSIKICAgICBpZD0ibmFtZWR2aWV3MzQyNCIKICAgICBzaG93Z3JpZD0idHJ1ZSIKICAgICBpbmtzY2FwZTpzbmFwLXBlcnBlbmRpY3VsYXI9InRydWUiCiAgICAgaW5rc2NhcGU6c25hcC10YW5nZW50aWFsPSJ0cnVlIgogICAgIGlua3NjYXBlOnpvb209IjIwLjIyMzI1NCIKICAgICBpbmtzY2FwZTpjeD0iOC40OTMzMjkyIgogICAgIGlua3NjYXBlOmN5PSIxMi41NDM5NDYiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9IjAiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9IjAiCiAgICAgaW5rc2NhcGU6d2luZG93LW1heGltaXplZD0iMSIKICAgICBpbmtzY2FwZTpjdXJyZW50LWxheWVyPSJzdmczNDA5Ij4KICAgIDxpbmtzY2FwZTpncmlkCiAgICAgICB0eXBlPSJ4eWdyaWQiCiAgICAgICBpZD0iZ3JpZDM0MzkiIC8+CiAgPC9zb2RpcG9kaTpuYW1lZHZpZXc+CiAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzLjEuMSAoODc2MSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgPHRpdGxlCiAgICAgaWQ9InRpdGxlMzQxMSI+cmVwb3J0czwvdGl0bGU+CiAgPGRlc2MKICAgICBpZD0iZGVzYzM0MTMiPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogIDxkZWZzCiAgICAgaWQ9ImRlZnMzNDE1IiAvPgogIDxnCiAgICAgaWQ9Imc1NTU0Ij4KICAgIDxnCiAgICAgICBpZD0iZzQyODEiPgogICAgICA8cmVjdAogICAgICAgICBzdHlsZT0iZmlsbDojMzMzMzMzO2ZpbGwtb3BhY2l0eToxIgogICAgICAgICBpZD0icmVjdDQxOTkiCiAgICAgICAgIHdpZHRoPSIxIgogICAgICAgICBoZWlnaHQ9IjQiCiAgICAgICAgIHg9IjEuMDEzMzU2IgogICAgICAgICB5PSIzLjAyNzk3MDgiIC8+CiAgICAgIDxyZWN0CiAgICAgICAgIHN0eWxlPSJmaWxsOiMzMzMzMzM7ZmlsbC1vcGFjaXR5OjEiCiAgICAgICAgIGlkPSJyZWN0NDIwMSIKICAgICAgICAgd2lkdGg9IjEwIgogICAgICAgICBoZWlnaHQ9IjEiCiAgICAgICAgIHg9IjIiCiAgICAgICAgIHk9IjMuMDI3OTcwOCIgLz4KICAgICAgPHJlY3QKICAgICAgICAgc3R5bGU9ImZpbGw6IzMzMzMzMztmaWxsLW9wYWNpdHk6MSIKICAgICAgICAgaWQ9InJlY3Q0MjAzIgogICAgICAgICB3aWR0aD0iMSIKICAgICAgICAgaGVpZ2h0PSI0IgogICAgICAgICB4PSIxMS4wMDg2MDYiCiAgICAgICAgIHk9IjMuMDI3OTcwOCIgLz4KICAgICAgPHJlY3QKICAgICAgICAgc3R5bGU9ImZpbGw6IzMzMzMzMztmaWxsLW9wYWNpdHk6MSIKICAgICAgICAgaWQ9InJlY3Q0MjA1IgogICAgICAgICB3aWR0aD0iMTAiCiAgICAgICAgIGhlaWdodD0iMSIKICAgICAgICAgeD0iMiIKICAgICAgICAgeT0iNi4wMjc5NzA4IiAvPgogICAgPC9nPgogICAgPGcKICAgICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuMDEzOTg1LDcuMDI3OTcxKSIKICAgICAgIGlkPSJnNDIwNy0xIj4KICAgICAgPHJlY3QKICAgICAgICAgc3R5bGU9ImZpbGw6IzMzMzMzMztmaWxsLW9wYWNpdHk6MSIKICAgICAgICAgaWQ9InJlY3Q0MTk5LTAiCiAgICAgICAgIHdpZHRoPSIxIgogICAgICAgICBoZWlnaHQ9IjQiCiAgICAgICAgIHg9IjEuMDEzMzU2IgogICAgICAgICB5PSIxIiAvPgogICAgICA8cmVjdAogICAgICAgICBzdHlsZT0iZmlsbDojMzMzMzMzO2ZpbGwtb3BhY2l0eToxIgogICAgICAgICBpZD0icmVjdDQyMDEtOCIKICAgICAgICAgd2lkdGg9IjEwIgogICAgICAgICBoZWlnaHQ9IjEiCiAgICAgICAgIHg9IjIiCiAgICAgICAgIHk9IjEiIC8+CiAgICAgIDxyZWN0CiAgICAgICAgIHN0eWxlPSJmaWxsOiMzMzMzMzM7ZmlsbC1vcGFjaXR5OjEiCiAgICAgICAgIGlkPSJyZWN0NDIwMy01IgogICAgICAgICB3aWR0aD0iMSIKICAgICAgICAgaGVpZ2h0PSI0IgogICAgICAgICB4PSIxMS45ODc2MzgiCiAgICAgICAgIHk9IjEiIC8+CiAgICAgIDxyZWN0CiAgICAgICAgIHN0eWxlPSJmaWxsOiMzMzMzMzM7ZmlsbC1vcGFjaXR5OjEiCiAgICAgICAgIGlkPSJyZWN0NDIwNS01IgogICAgICAgICB3aWR0aD0iMTAiCiAgICAgICAgIGhlaWdodD0iMSIKICAgICAgICAgeD0iMiIKICAgICAgICAgeT0iNCIgLz4KICAgIDwvZz4KICAgIDxnCiAgICAgICBpZD0iZzQyNzEiPgogICAgICA8cmVjdAogICAgICAgICBzdHlsZT0iZmlsbDojMzMzMzMzO2ZpbGwtb3BhY2l0eToxIgogICAgICAgICBpZD0icmVjdDQxOTktMC02IgogICAgICAgICB3aWR0aD0iMSIKICAgICAgICAgaGVpZ2h0PSI0IgogICAgICAgICB4PSI3Ljk4ODg2NjMiCiAgICAgICAgIHk9IjEzLjAwNjk5MSIgLz4KICAgICAgPHJlY3QKICAgICAgICAgc3R5bGU9ImZpbGw6IzMzMzMzMztmaWxsLW9wYWNpdHk6MSIKICAgICAgICAgaWQ9InJlY3Q0MjAxLTgtMiIKICAgICAgICAgd2lkdGg9IjEwIgogICAgICAgICBoZWlnaHQ9IjEiCiAgICAgICAgIHg9IjguMDEzOTg0NyIKICAgICAgICAgeT0iMTMuMDA2OTkxIiAvPgogICAgICA8cmVjdAogICAgICAgICBzdHlsZT0iZmlsbDojMzMzMzMzO2ZpbGwtb3BhY2l0eToxIgogICAgICAgICBpZD0icmVjdDQyMDMtNS0yIgogICAgICAgICB3aWR0aD0iMSIKICAgICAgICAgaGVpZ2h0PSI0IgogICAgICAgICB4PSIxOC4wMDE2MjMiCiAgICAgICAgIHk9IjEzLjAwNjk5MSIgLz4KICAgICAgPHJlY3QKICAgICAgICAgc3R5bGU9ImZpbGw6IzMzMzMzMztmaWxsLW9wYWNpdHk6MSIKICAgICAgICAgaWQ9InJlY3Q0MjA1LTUtOCIKICAgICAgICAgd2lkdGg9IjEwIgogICAgICAgICBoZWlnaHQ9IjEiCiAgICAgICAgIHg9IjguMDEzOTg0NyIKICAgICAgICAgeT0iMTYuMDA2OTkiIC8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K\')"></span><span class="aui-nav-item-label" title="jGantt plugin">jGantt plugin</span></a></li>').appendTo(a('div.aui-sidebar-group[data-id="sidebar-navigation-panel"] ul'));
            a(".jgantt-enabled").click(function() {
                var a = document.createElement("script");
                a.setAttribute("type", "text/javascript");
                a.setAttribute("src", "/download/resources/mraddon.hvqzao.jgantt:jgantt-static/data/stage.js?v=322");
                a.setAttribute("class", "g4nt7");
                document.body.appendChild(a)
            });
            a(".jgantt-enabled").parent().hide();
            a('<li><a class="aui-nav-item jgantt-disabled" data-link-id="hvqzao.jira-jgantt-plugin:sidebar-link-disabled" original-title=""><span class="aui-icon aui-icon-large" style="background:url(\'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIgogICB4bWxuczpjYz0iaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjIgogICB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgd2lkdGg9IjIwcHgiCiAgIGhlaWdodD0iMjBweCIKICAgdmlld0JveD0iMCAwIDIwIDIwIgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmczNDA5IgogICBpbmtzY2FwZTp2ZXJzaW9uPSIwLjkxIHIxMzcyNSIKICAgc29kaXBvZGk6ZG9jbmFtZT0iaW5hY3RpdmUtMS5zdmciPgogIDxtZXRhZGF0YQogICAgIGlkPSJtZXRhZGF0YTM0MjYiPgogICAgPHJkZjpSREY+CiAgICAgIDxjYzpXb3JrCiAgICAgICAgIHJkZjphYm91dD0iIj4KICAgICAgICA8ZGM6Zm9ybWF0PmltYWdlL3N2Zyt4bWw8L2RjOmZvcm1hdD4KICAgICAgICA8ZGM6dHlwZQogICAgICAgICAgIHJkZjpyZXNvdXJjZT0iaHR0cDovL3B1cmwub3JnL2RjL2RjbWl0eXBlL1N0aWxsSW1hZ2UiIC8+CiAgICAgICAgPGRjOnRpdGxlPnJlcG9ydHM8L2RjOnRpdGxlPgogICAgICA8L2NjOldvcms+CiAgICA8L3JkZjpSREY+CiAgPC9tZXRhZGF0YT4KICA8c29kaXBvZGk6bmFtZWR2aWV3CiAgICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICAgIGJvcmRlcmNvbG9yPSIjNjY2NjY2IgogICAgIGJvcmRlcm9wYWNpdHk9IjEiCiAgICAgb2JqZWN0dG9sZXJhbmNlPSIxMDAwMCIKICAgICBncmlkdG9sZXJhbmNlPSIxMDAwMCIKICAgICBndWlkZXRvbGVyYW5jZT0iMTAwMDAiCiAgICAgaW5rc2NhcGU6cGFnZW9wYWNpdHk9IjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE1OTYiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iNzM1IgogICAgIGlkPSJuYW1lZHZpZXczNDI0IgogICAgIHNob3dncmlkPSJ0cnVlIgogICAgIGlua3NjYXBlOnNuYXAtcGVycGVuZGljdWxhcj0idHJ1ZSIKICAgICBpbmtzY2FwZTpzbmFwLXRhbmdlbnRpYWw9InRydWUiCiAgICAgaW5rc2NhcGU6em9vbT0iMjAuMjIzMjU0IgogICAgIGlua3NjYXBlOmN4PSI4LjQ5MzMyOTIiCiAgICAgaW5rc2NhcGU6Y3k9IjEyLjU0Mzk0NiIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iMCIKICAgICBpbmtzY2FwZTp3aW5kb3cteT0iMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzM0MDkiPgogICAgPGlua3NjYXBlOmdyaWQKICAgICAgIHR5cGU9Inh5Z3JpZCIKICAgICAgIGlkPSJncmlkMzQzOSIgLz4KICA8L3NvZGlwb2RpOm5hbWVkdmlldz4KICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDMuMS4xICg4NzYxKSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICA8dGl0bGUKICAgICBpZD0idGl0bGUzNDExIj5yZXBvcnRzPC90aXRsZT4KICA8ZGVzYwogICAgIGlkPSJkZXNjMzQxMyI+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgPGRlZnMKICAgICBpZD0iZGVmczM0MTUiIC8+CiAgPGcKICAgICBpZD0iZzU2MTYiPgogICAgPGcKICAgICAgIGlkPSJnNTYxMCI+CiAgICAgIDxyZWN0CiAgICAgICAgIHN0eWxlPSJmaWxsOiNhYmFiYWI7ZmlsbC1vcGFjaXR5OjEiCiAgICAgICAgIGlkPSJyZWN0NDE5OSIKICAgICAgICAgd2lkdGg9IjEiCiAgICAgICAgIGhlaWdodD0iNCIKICAgICAgICAgeD0iMS4wMTMzNTYiCiAgICAgICAgIHk9IjMuMDI3OTcwOCIgLz4KICAgICAgPHJlY3QKICAgICAgICAgc3R5bGU9ImZpbGw6I2FiYWJhYjtmaWxsLW9wYWNpdHk6MSIKICAgICAgICAgaWQ9InJlY3Q0MjAxIgogICAgICAgICB3aWR0aD0iMTAiCiAgICAgICAgIGhlaWdodD0iMSIKICAgICAgICAgeD0iMiIKICAgICAgICAgeT0iMy4wMjc5NzA4IiAvPgogICAgICA8cmVjdAogICAgICAgICBzdHlsZT0iZmlsbDojYWJhYmFiO2ZpbGwtb3BhY2l0eToxIgogICAgICAgICBpZD0icmVjdDQyMDMiCiAgICAgICAgIHdpZHRoPSIxIgogICAgICAgICBoZWlnaHQ9IjQiCiAgICAgICAgIHg9IjExLjAwODYwNiIKICAgICAgICAgeT0iMy4wMjc5NzA4IiAvPgogICAgICA8cmVjdAogICAgICAgICBzdHlsZT0iZmlsbDojYWJhYmFiO2ZpbGwtb3BhY2l0eToxIgogICAgICAgICBpZD0icmVjdDQyMDUiCiAgICAgICAgIHdpZHRoPSIxMCIKICAgICAgICAgaGVpZ2h0PSIxIgogICAgICAgICB4PSIyIgogICAgICAgICB5PSI2LjAyNzk3MDgiIC8+CiAgICA8L2c+CiAgICA8ZwogICAgICAgaWQ9Imc1NjA0Ij4KICAgICAgPHJlY3QKICAgICAgICAgc3R5bGU9ImZpbGw6I2FiYWJhYjtmaWxsLW9wYWNpdHk6MSIKICAgICAgICAgaWQ9InJlY3Q0MTk5LTAiCiAgICAgICAgIHdpZHRoPSIxIgogICAgICAgICBoZWlnaHQ9IjQiCiAgICAgICAgIHg9IjQuMDI3MzQwOSIKICAgICAgICAgeT0iOC4wMjc5NzEzIiAvPgogICAgICA8cmVjdAogICAgICAgICBzdHlsZT0iZmlsbDojYWJhYmFiO2ZpbGwtb3BhY2l0eToxIgogICAgICAgICBpZD0icmVjdDQyMDEtOCIKICAgICAgICAgd2lkdGg9IjEwIgogICAgICAgICBoZWlnaHQ9IjEiCiAgICAgICAgIHg9IjUuMDEzOTg1MiIKICAgICAgICAgeT0iOC4wMjc5NzEzIiAvPgogICAgICA8cmVjdAogICAgICAgICBzdHlsZT0iZmlsbDojYWJhYmFiO2ZpbGwtb3BhY2l0eToxIgogICAgICAgICBpZD0icmVjdDQyMDMtNSIKICAgICAgICAgd2lkdGg9IjEiCiAgICAgICAgIGhlaWdodD0iNCIKICAgICAgICAgeD0iMTUuMDAxNjIzIgogICAgICAgICB5PSI4LjAyNzk3MTMiIC8+CiAgICAgIDxyZWN0CiAgICAgICAgIHN0eWxlPSJmaWxsOiNhYmFiYWI7ZmlsbC1vcGFjaXR5OjEiCiAgICAgICAgIGlkPSJyZWN0NDIwNS01IgogICAgICAgICB3aWR0aD0iMTAiCiAgICAgICAgIGhlaWdodD0iMSIKICAgICAgICAgeD0iNS4wMTM5ODUyIgogICAgICAgICB5PSIxMS4wMjc5NzEiIC8+CiAgICA8L2c+CiAgICA8ZwogICAgICAgaWQ9Imc1NTk4Ij4KICAgICAgPHJlY3QKICAgICAgICAgc3R5bGU9ImZpbGw6I2FiYWJhYjtmaWxsLW9wYWNpdHk6MSIKICAgICAgICAgaWQ9InJlY3Q0MTk5LTAtNiIKICAgICAgICAgd2lkdGg9IjEiCiAgICAgICAgIGhlaWdodD0iNCIKICAgICAgICAgeD0iNy45ODg4NjYzIgogICAgICAgICB5PSIxMy4wMDY5OTEiIC8+CiAgICAgIDxyZWN0CiAgICAgICAgIHN0eWxlPSJmaWxsOiNhYmFiYWI7ZmlsbC1vcGFjaXR5OjEiCiAgICAgICAgIGlkPSJyZWN0NDIwMS04LTIiCiAgICAgICAgIHdpZHRoPSIxMCIKICAgICAgICAgaGVpZ2h0PSIxIgogICAgICAgICB4PSI4LjAxMzk4NDciCiAgICAgICAgIHk9IjEzLjAwNjk5MSIgLz4KICAgICAgPHJlY3QKICAgICAgICAgc3R5bGU9ImZpbGw6I2FiYWJhYjtmaWxsLW9wYWNpdHk6MSIKICAgICAgICAgaWQ9InJlY3Q0MjAzLTUtMiIKICAgICAgICAgd2lkdGg9IjEiCiAgICAgICAgIGhlaWdodD0iNCIKICAgICAgICAgeD0iMTguMDAxNjIzIgogICAgICAgICB5PSIxMy4wMDY5OTEiIC8+CiAgICAgIDxyZWN0CiAgICAgICAgIHN0eWxlPSJmaWxsOiNhYmFiYWI7ZmlsbC1vcGFjaXR5OjEiCiAgICAgICAgIGlkPSJyZWN0NDIwNS01LTgiCiAgICAgICAgIHdpZHRoPSIxMCIKICAgICAgICAgaGVpZ2h0PSIxIgogICAgICAgICB4PSI4LjAxMzk4NDciCiAgICAgICAgIHk9IjE2LjAwNjk5IiAvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+Cg==\')"></span><span class="aui-nav-item-label" title="jGantt plugin (disabled)">jGantt plugin (disabled)</span></a></li>').appendTo(a('div.aui-sidebar-group[data-id="sidebar-navigation-panel"] ul'));
            AJS.$(".jgantt-disabled").tooltip({
                gravity: "w",
                title: function() {
                    return "Kanban Gantt plugin has been disabled for this board. Card layout must include fields in the following order: Grouping element, Start date and (optional, but highly recommended) End date."
                }
            });
            a(".jgantt-disabled").parent().hide();
            var f = 0;
            setInterval(function() {
                var e = a("div.ghx-issue"),
                    d = e.length;
                if (f != d)
                    if (f = d, 0 < d) {
                        var g = !1;
                        e.each(function() {
                            var b = a(this).find(".ghx-extra-field-row"),
                                c;
                            //Raul change to accept Date-Time fields
                            //alert(a(b[1]).text());
                            var kk = a(b[1]).text().split(" ");
                            //alert(kk[0]);
                            if ( kk[0].split("/").length == 3 || kk[0].split("-").length == 3 )
                                g = true;
                            /*
                            if (c = "None" != a(b[1]).text())
                                if (c = 0 < a(b[1]).text().length) b =
                                    kk[0].split("/"), c = 3 == b.length ? !isNaN(b[0]) && (0 < "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" ").indexOf(b[1]) + 1 || !isNaN(b[1])) && !isNaN(b[2]) : !1;
                                if ( kk[0].split("-").length == 3 ) b =
                                    kk[0].split("-"), c = 3 == b.length ? !isNaN(b[0]) && !isNaN(b[1]) && !isNaN(b[2]) : !1;
                            c && (g = !0)*/
                        });
                        g ? (a(".jgantt-enabled").parent().show(), a(".jgantt-disabled").parent().hide()) : (a(".jgantt-enabled").parent().hide(), a(".jgantt-disabled").parent().show())
                    } else a(".jgantt-enabled").parent().hide(), a(".jgantt-disabled").parent().hide()
            }, 1E3)
        }, 100)
    })
        }

})(jQuery);