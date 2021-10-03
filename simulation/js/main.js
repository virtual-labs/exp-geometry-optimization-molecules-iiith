"use strict";

import data, { instructions } from "./data.js";

let currentInstructionIndex = -1;
let sleepTime = 3500;

const setInstruction = (index) => {
  if (index < instructions.length && currentInstructionIndex < index) {
    currentInstructionIndex = index;
    document.getElementById("instructions").innerHTML =
      instructions[currentInstructionIndex].message;

    instructions[currentInstructionIndex].elementId.forEach((id, ind) => {
      if (ind === 0)
        document.getElementById(id).scrollIntoView({
          behavior: "smooth",
        });
      document.getElementById(id).classList.add("highlight");
    });
    sleep(sleepTime - 600).then(() =>
      instructions[currentInstructionIndex].elementId.forEach((id) =>
        document.getElementById(id).classList.remove("highlight")
      )
    );
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const setMultipleInstructions = (indexes) =>
  indexes.forEach((val, ind) =>
    sleep(sleepTime * ind).then(() => setInstruction(val))
  );

let element = "butadiene";
let elementUpdate = true;

let angle = 0;
let deltaX = 0.2;

let myChart = null;

const initChart = () => {
  const xyValues = Object.keys(data[element]).map((key) => ({
    x: key,
    y: data[element][key]["energy"],
  }));
  if (myChart) myChart.destroy();
  myChart = new Chart("myChart", {
    type: "scatter",
    data: {
      datasets: [
        {
          pointRadius: 4,
          pointBackgroundColor: "rgb(0,0,255)",
          pointBorderColor: "rgb(133, 193, 233)",
          data: xyValues,
        },
      ],
    },
    options: {
      legend: { display: false },
      scales: {
        xAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Angle (in degree)",
            },
          },
        ],

        yAxes: [
          {
            scaleLabel: {
              display: true,
              labelString: "Energy",
            },
          },
        ],
      },
      onClick: (evt) => {
        const points = myChart.getElementsAtEventForMode(
          evt,
          "nearest",
          { intersect: true },
          true
        );

        if (points.length) {
          setInstruction(3);
          const firstPoint = points[0];
          var value =
            myChart.data.datasets[firstPoint._datasetIndex].data[
              firstPoint._index
            ];
          angle = parseInt(value.x);
          triggerUpdate();
        }
      },
    },
  });
};

const highlightChart = (angle) => {
  if (myChart) {
    myChart.data.datasets[0].pointBackgroundColor = [];
    myChart.data.datasets[0].pointRadius = [];
    for (let i = 0; i < myChart.data.datasets[0].data.length; i++) {
      if (parseInt(myChart.data.datasets[0].data[i]["x"]) === angle) {
        myChart.data.datasets[0].pointRadius[i] = 7;
        myChart.data.datasets[0].pointBackgroundColor[i] = "red";
      } else {
        myChart.data.datasets[0].pointBackgroundColor[i] = "white";
      }
    }
    myChart.update();
  }
};

let width = 600,
  height = 300;
if (window.innerWidth < 900) {
  width = window.innerWidth;
  height = 300;
}
const movie = new ChemDoodle.MovieCanvas3D("element", width, height);

const setMolecule = () => {
  movie.clear();
  movie.frames = [];
  if (data !== null) {
    movie.addFrame([ChemDoodle.readXYZ(data[element][angle]["geometry"])], []);
    movie.styles.set3DRepresentation("Ball and Stick");
    movie.styles.atoms_displayLabels_3D = true;
    movie.styles.backgroundColor = "transparent";
    movie.loadMolecule(movie.frames[0].mols[0]);
  }
  return movie;
};

const triggerUpdate = () => {
  if (elementUpdate) {
    initChart();
    elementUpdate = false;
  }
  highlightChart(angle);
  setMolecule();
  document.getElementById("x-val").innerHTML = angle;
  document.getElementById("y-val").innerHTML = data[element][angle]["energy"];
};

document.querySelectorAll(".element-set .v-chip").forEach((button, ind) => {
  button.addEventListener("click", () => {
    setMultipleInstructions([1, 2]);
    document
      .querySelectorAll(".element-set .v-chip.active")
      .forEach((activeButton) => activeButton.classList.remove("active"));
    button.classList.add("active");
    if (ind === 0 && element !== "butadiene") {
      element = "butadiene";
      elementUpdate = true;
    } else if (ind === 1 && element !== "butane") {
      element = "butane";
      elementUpdate = true;
    } else if (element !== "ethane") {
      element = "ethane";
      elementUpdate = true;
    }
    triggerUpdate();
  });
});

triggerUpdate();
setInstruction(0);

const getClosest = (arr, value) =>
  arr.reduce((prev, curr) =>
    Math.abs(curr["y"] - value) < Math.abs(prev["y"] - value) ? curr : prev
  );

const steepestDescent = () => {
  let x2 = angle + 1;
  if (angle === 180) x2 = angle - 1;
  const slope =
    (data[element][x2]["energy"] - data[element][angle]["energy"]) /
    (x2 - angle);
  let dir = -1;
  if (slope < 0) {
    dir = 1;
  }
  angle = parseInt(angle + dir * deltaX);
  if (angle > 180) angle = 180;
  else if (angle < -180) angle = -180;
  triggerUpdate();
};

// for handling slider and button

const deltaXSlider = document.getElementById("delta-x-slider");
const deltaXVal = document.getElementById("delta-x");
deltaX = deltaXSlider.value;
deltaXVal.innerHTML = deltaX;

deltaXSlider.addEventListener("input", () => {
  deltaX = deltaXSlider.value;
  deltaXVal.innerHTML = deltaX;
});

deltaXSlider.addEventListener("mouseup", () => setInstruction(4));

deltaXSlider.addEventListener("touchend", () => setInstruction(4));

document.getElementById("get-next-point").addEventListener("click", () => {
  setMultipleInstructions([5, 6, 7]);
  steepestDescent();
});
