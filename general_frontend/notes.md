[x] default alle elemente ausgeblendet
[] wenn es für eine grid größe keine definition gibt dann auch nicht anzeigen (https://github.com/react-grid-layout/react-grid-layout/discussions/1994)
[] admin view und user view machen
[x] Default View muss immer gegeben werden sonst Fehler schmeissen
    [x] Fehler verfeinern um Asset Namen
[x] wie kann man versichern das eine nicht verfügbare Grid Size im GridLayout für normale Benutzer nicht angezeigt wird?
[x] Tabindex fixen, wird aktuell noch nicht nach index der elemente genommen sondern von der eigentlichen Reihenfolge der HTML Elemente
[x] Cleanup Funktion für Komponente bauen, sodass alte nicht mehr verwendete Objekte aus dem Store gelöscht werden, einfach die keys abgleichen und alte dementsprechend rausschmeissen
[x] wenn der edit button geklickt wird darf jeweils nur eine funktion getriggert werden, wie ist es möglich das zu versichern und was passiert wenn es mehrere edit buttons gibt?
    [x] selbiges gilt für save, detail, scroll usw... wie kann das vereinheitlicht werden?
[] Alle Parameter einer View im Sessionstorage speichern
[x] SetView beibringen das sie weitere API Endpunkte endgegennehmen kann um diese dann in der View für den Form Handler zu verwenden

# WISHLIST
[-] Werte über API abfragen und diese aus den individuellen Komponenten abrufen können
    [x] Error und Loading Handling
    [] Aktualisieren von Daten über Websockets
[x] Jeder View muss seine verfügbaren Buttons definieren können und mit Elementen oder Aktionen verknüpft werden
    [x] Definitions Konvention überlegen
[] Element sagen ob es selbst filtert oder ob die API die Filterung übernimmt
[] Design muss von aktueller Seite übernommen werden
[x] Unterschiedliche Views müssen definierbar und wechselbar sein
[x] Jeder dieser Views muss in der Lage sein unterschiedliche Layouts und Elemente darzustellen
[-] Jeder dieser Views muss individuelle Requests setzen können, diese müssen bei View und Filter wechsel jeweils individuell setzbar sein
[x] Position der Input Elemente muss gespeichert werden
[x] Der View muss den Zustand aller Input Felder kennen und diesen für die API zugänglich machen
[] Alle Input Komponenten müssen funktionieren welche auch auf der aktuellen Seite funktionieren (lieber noch mehr)
    [] Textinput
    [] Number
    [] Slider (Number Range)
    [] Select
    [] Multiselect
    [] Toggle
    [] Radio Button Single and Multi Select
    [] Dateinput (Daterange, Time, Date, Datetime)
    [] Tabellen Input
    [] Textbox
[] Default Elemente müssen im neuen Schema Funktionieren:
    [] Tabelle / Pivot Tabelle
    [] Charts (Recharts) --> Props Interface
    [] Image
    [] Text
    [] Textbox
[] Durch einen Validate Request finden wir heraus ob Schreib oder Lese Rechte vorhanden sind sonst wieder zurück auf default view
[x] Assets müssen Seitenweise sortiert werden
[] Tooltips für Input Felder wenn Fehlermeldung bei validator zurückkommt
[] Asset spezifische Filter
[-] Es soll möglich sein Mischseiten zu erstellen auch mit teilen aus der vorherigen Seite
    [] Mit aktuellem Asset versuchen
[] So wenige Any Types wie möglich (TS)
[] Websocket implementierung für Benutzer bearbeitet aktuell
[] History Push state für Route Context (History: pushState(), https://developer.mozilla.org/en-US/docs/Web/API/History/pushState)
[] Buttons müssen per View dargestellt werden und nicht auf das gesamte Asset