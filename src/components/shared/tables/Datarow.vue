<template>
  <div class="data-row">
    <div class="type data-cell">
      D
    </div>
    <div class="name data-cell">
      Teszt Elek (1991.01.01)
    </div>
    <div class="info data-cell">
      063012345678
    </div>
    <div class="work data-cell">
      Sulihost, Délmagyar
    </div>
    <div class="workdays data-cell">
      22 nap (168 óra)
    </div>
    <div class="employment-examinations data-cell">
      2018.03.03
    </div>
  </div>
</template>
<style>
.data-cell {
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
    position: relative;
    padding-left: 16px;
    cursor: pointer;
  }
  .data-row {
  display: flex;
  width: 100%;
  padding: 0 16px;
  border-bottom: 1px solid;
  font-size: 20px;
  font-weight: bold;
  height: 52px;
  flex-wrap: nowrap;
  align-items: center;
  box-sizing: border-box;
}
.data-row:not(.headers):hover {
  background-color: #333;
  color: #fff;
  cursor: pointer;
}
.headers.data-row {
  margin-bottom: 2em;
}

.data-cell {
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  overflow: hidden;
  position: relative;
  padding-right: 16px;
  cursor: pointer;
  text-align: center;
}
.type.data-cell {
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  height: 28px;
  justify-content: center;
  margin-left: auto;
  width: 32px;
}
.name.data-cell {
  flex: 1;
}
.workdays.data-cell,
.cell-work.data-cell,
.info.data-cell {
  width: 20%;
}
.employment-examinations.data-cell {
  width: 12%;
}
</style>
