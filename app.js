const corona = new Corona();
const results = document.getElementById("results");

let totalCount = 0;
let output = `<table class="table table-striped table-bordered table-hover table-sm">
  <thead class="thead-dark">
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Cases</th>
      <th scope="col">New</th>
      
    </tr>
  </thead>
  <tbody>`;

// Get today's date to compare to keys
const date = new Date();
const month = String(date.getMonth() + 1);
const day = String(date.getDate());
const year = String(date.getFullYear()).substr(-2);
const today = `${month}/${day}/${year}`;

//Get historical cases from corona api
corona.getData().then((data) => {
  data.forEach((result) => {
    if (result.county === "black hawk") {
      const cases = result.timeline.cases;
      console.log(cases);
      Object.entries(cases).forEach(([key, value]) => {
        //Don't get today's key from this API, mathdroid is updated sooner
        if (key !== today) {
          // console.log(`${key}`);
          output += `<tr>
      <td class="date">${key}</td>
      <td class="cases">${value}</td>
      <td class="count">${value - totalCount}</td>
    </tr>`;
          totalCount = value;
        }
      });
    }
  });
});

// Get today's cases from mathdroid
setTimeout(() => {
  corona.getCounties().then((data) => {
    data.forEach((result) => {
      if (result.provinceState === "Iowa") {
        if (result.admin2 === "Black Hawk") {
          // console.log(result);
          output += `
        <td class="date">${today}</td>
        <td class="cases">${result.confirmed}</td>
       <td class="count">${result.confirmed - totalCount}</td>`;
          totalCount = result.confirmed;
        }
      }
    });
    output += `</tbody>
</table>`;
    results.innerHTML = output;
  });
}, 800);

// Calling to separate API to get today's cases because it's updated sooner
// corona.getCounties().then((data) => {
//   //Get today's date to display
//   const date = new Date();
//   const month = String(date.getMonth() + 1);
//   const day = String(date.getDate());
//   const year = String(date.getFullYear()).substr(-2);
//   const today = `${month}/${day}/${year}`;

//   data.forEach((result) => {
//     if (result.provinceState === "Iowa") {
//       if (result.admin2 === "Black Hawk") {
//         console.log(result);
//         output += `
//         <td class="date">${today}</td>
//         <td class="cases">${result.confirmed}</td>
//         <td class="count">${result.confirmed - totalCount}</td>`;
//         totalCount = result.confirmed;
//       }
//     }
//   });
//   output += `</tbody>
// </table>`;
//   results.innerHTML = output;
// });
