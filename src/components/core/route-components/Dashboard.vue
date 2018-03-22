<template>
  <div>
    <h1>Vezérlőpult</h1>
      <h3>Todos (ezeket csináld meg elsőnek)</h3>
      <ul>
        <li>
          Valamiféle loading a form submitokhoz.(gombon belül loader)
          <br> Storhoz hozzáadni loading modult, ahol tároljuk a loader infokat.
          Ez után route loading hozzáadása.
        </li>
        <li>
          User route befejezése, törlés, edit hozzáadása, Munkahelyek hozzáadása a Formhoz
          <br>Névre kattintva a Profile betöltése
        </li>
        <li>
          Success hozzáadáasa kis popupban, ami ben van egy link az új felhasználóhoz
        </li>
      </ul>
      <div style="dsiplay:none">
        <h3>Bugs</h3>
        <ul>
          <li><h1>unknown action type: logout</h1></li>
          <li>
            Választ találni arra, hogy  miért adtam min-heigh-ot a main containernek?(Kivettem a min-heightot)
            <br>
            Tudom miért raktam bele. Gomb ugrál amikor átmegyunk másik oldalra(Erre kell találni egy megoldást).
          </li>
          <li>Fixed gomb ugrál amikor navigálunk oldalak között</li>
        </ul>
      </div>
  </div>
</template>
<script>
export default {

}
</script>
<style>

</style>
