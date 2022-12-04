/* 
 x Formuläret där köparen fyller i sina uppgifter skall ha: Förnamn, efterNamn, Adress, zipCodemer, Postort, ev portCode, Telefon (mobil), E-postadress.
 x Samtliga formulärfält ska valideras och formuläret/beställningen ska inte gå att skicka om det finns några fel
 x När formuläret är korrekt ifyllt ska Skicka-/Beställ-knappen aktiveras, innan det är den utgråad 
 x Checkbox för beställning av nyhetsbrev (ska vara iklickad som default)
 x Checkbox för godkännande av behandling av personuppgifter

 ***** (behöver connecta funktionen till beställda produkter osv också, just nu endast connectad till formulär) *****
 x Det ska finnas en "Rensa beställning"-knapp som återställer samtliga formulärfält liksom eventuella beställda munkar/produkter (alltså antalet återställs till 0)

 - Val för betalsätt: kort eller faktura
 - Om kort väljs som betalsätt, visas fält för kortphoneNum, datum/år och CVC. Dessa behöver inte valideras!
 - Om faktura valts som betalsätt ska ett formulärfält för svenskt personphoneNum visas. Även detta fält ska valideras innan formuläret går att skicka iväg, dvs. att man fyllt i korrekt personphoneNum.
 - Felen ska markeras och kommuniceras tydligt (t.ex. ej enbart med röd färg, tag i beaktande a11y)
 - Det ska finnas ett fält för att mata in en rabattkod.
 
 PSEUDOKOD
 - OM formuläret är korrekt (true) så ska skicka/beställ knappen aktiveras (enable), ANNARS (disabled).
 - OM kort väljs som betalsätt, visa fält för kortphoneNum, datum/år och CVC.
 - OM faktura väljs som betalsätt, visa ett formulärfält för svenskt personphoneNum
 och OM svenskt personphoneNum ha skrivits rätt, markera att det är godkänt. ANNARS markera att det är rött.

 */
