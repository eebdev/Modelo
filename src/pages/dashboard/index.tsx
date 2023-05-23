import Navbar from "@components/navbar";
import Card from "@components/Card";
import Footer from "@components/footer";

export default function Home() {
  return (
    <div className="bg-black-alt font-sans leading-normal tracking-normal">
      <Navbar />
      {/* <!--Container--> */}
      <div className="container w-full mx-auto pt-20">
        <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-gray-800 leading-normal">
          {/* <!--Console Content--> */}

          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              {/* <!--Metric Card--> */}
              <Card title="Total Revenue" value="$3249" color="#16a34a">
                <i className="fa fa-wallet fa-2x fa-fw fa-inverse"></i>
              </Card>
              {/* <!--/Metric Card--> */}
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <Card title="Total Users" value="249" color="#16a34a">
                <i className="fas fa-users fa-2x fa-fw fa-inverse"></i>
              </Card>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <Card title="New Users" value="2" color="#ca8a04">
                <i className="fas fa-user-plus fa-2x fa-fw fa-inverse"></i>
              </Card>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <Card title="Server Uptime" value="152 days" color="#2563eb">
                <i className="fas fa-server fa-2x fa-fw fa-inverse"></i>
              </Card>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <Card title="To Do List" value="7 tasks" color="#2563eb">
                <div className="rounded p-3 bg-indigo-600"></div>
              </Card>
            </div>
            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              <Card title="Issues" value="3" color="#dc2626">
                <i className="fas fa-inbox fa-2x fa-fw fa-inverse"></i>
              </Card>
            </div>
          </div>
          <hr className="border-b-2 border-gray-600 my-8 mx-4" />
          <div className="flex flex-row flex-wrap flex-grow mt-2">
            <div className="w-full md:w-1/2 p-3">
              {/* <!--Graph Card--> */}
              <div className="bg-gray-900 border border-gray-800 rounded shadow">
                <div className="border-b border-gray-800 p-3">
                  <h5 className="font-bold uppercase text-gray-600">Graph</h5>
                </div>
                {/* <div className="p-5">
                            <canvas id="chartjs-7" className="chartjs" width="undefined" height="undefined"></canvas>
                            <script>
                                new Chart(document.getElementById("chartjs-7"), {
                                    "type": "bar",
                                    "data": {
                                        "labels": ["January", "February", "March", "April"],
                                        "datasets": [{
                                            "label": "Page Impressions",
                                            "data": [10, 20, 30, 40],
                                            "borderColor": "rgb(255, 99, 132)",
                                            "backgroundColor": "rgba(255, 99, 132, 0.2)"
                                        }, {
                                            "label": "Adsense Clicks",
                                            "data": [5, 15, 10, 30],
                                            "type": "line",
                                            "fill": false,
                                            "borderColor": "rgb(54, 162, 235)"
                                        }]
                                    },
                                    "options": {
                                        "scales": {
                                            "yAxes": [{
                                                "ticks": {
                                                    "beginAtZero": true
                                                }
                                            }]
                                        }
                                    }
                                });
                            </script>
                        </div> */}
              </div>
              {/* <!--/Graph Card--> */}
            </div>

            <div className="w-full md:w-1/2 p-3">
              {/* <!--Graph Card--> */}
              <div className="bg-gray-900 border border-gray-800 rounded shadow">
                <div className="border-b border-gray-800 p-3">
                  <h5 className="font-bold uppercase text-gray-600">Graph</h5>
                </div>
                {/* <div className="p-5">
                            <canvas id="chartjs-0" className="chartjs" width="undefined" height="undefined"></canvas>
                            <script>
                                new Chart(document.getElementById("chartjs-0"), {
                                    "type": "line",
                                    "data": {
                                        "labels": ["January", "February", "March", "April", "May", "June", "July"],
                                        "datasets": [{
                                            "label": "Views",
                                            "data": [65, 59, 80, 81, 56, 55, 40],
                                            "fill": false,
                                            "borderColor": "rgb(75, 192, 192)",
                                            "lineTension": 0.1
                                        }]
                                    },
                                    "options": {}
                                });
                            </script>
                        </div> */}
              </div>
              {/* <!--/Graph Card--> */}
            </div>

            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              {/* <!--Graph Card--> */}
              <div className="bg-gray-900 border border-gray-800 rounded shadow">
                <div className="border-b border-gray-800 p-3">
                  <h5 className="font-bold uppercase text-gray-600">Graph</h5>
                </div>
                {/* <div className="p-5">
                            <canvas id="chartjs-1" className="chartjs" width="undefined" height="undefined"></canvas>
                            <script>
                                new Chart(document.getElementById("chartjs-1"), {
                                    "type": "bar",
                                    "data": {
                                        "labels": ["January", "February", "March", "April", "May", "June", "July"],
                                        "datasets": [{
                                            "label": "Likes",
                                            "data": [65, 59, 80, 81, 56, 55, 40],
                                            "fill": false,
                                            "backgroundColor": ["rgba(255, 99, 132, 0.2)", "rgba(255, 159, 64, 0.2)", "rgba(255, 205, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(201, 203, 207, 0.2)"],
                                            "borderColor": ["rgb(255, 99, 132)", "rgb(255, 159, 64)", "rgb(255, 205, 86)", "rgb(75, 192, 192)", "rgb(54, 162, 235)", "rgb(153, 102, 255)", "rgb(201, 203, 207)"],
                                            "borderWidth": 1
                                        }]
                                    },
                                    "options": {
                                        "scales": {
                                            "yAxes": [{
                                                "ticks": {
                                                    "beginAtZero": true
                                                }
                                            }]
                                        }
                                    }
                                });
                            </script>
                        </div> */}
              </div>
              {/* <!--/Graph Card--> */}
            </div>

            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              {/* <!--Graph Card--> */}
              <div className="bg-gray-900 border border-gray-800 rounded shadow">
                <div className="border-b border-gray-800 p-3">
                  <h5 className="font-bold uppercase text-gray-600">Graph</h5>
                </div>
                {/* <div className="p-5"><canvas id="chartjs-4" className="chartjs" width="undefined" height="undefined"></canvas>
                            <script>
                                new Chart(document.getElementById("chartjs-4"), {
                                    "type": "doughnut",
                                    "data": {
                                        "labels": ["P1", "P2", "P3"],
                                        "datasets": [{
                                            "label": "Issues",
                                            "data": [300, 50, 100],
                                            "backgroundColor": ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)"]
                                        }]
                                    }
                                });
                            </script>
                        </div> */}
              </div>
              {/* <!--/Graph Card--> */}
            </div>

            <div className="w-full md:w-1/2 xl:w-1/3 p-3">
              {/* <!--Template Card--> */}
              <div className="bg-gray-900 border border-gray-800 rounded shadow">
                <div className="border-b border-gray-800 p-3">
                  <h5 className="font-bold uppercase text-gray-600">
                    Template
                  </h5>
                </div>
                <div className="p-5"></div>
              </div>
              {/* <!--/Template Card--> */}
            </div>

            <div className="w-full p-3">
              {/* <!--Table Card--> */}
              <div className="bg-gray-900 border border-gray-800 rounded shadow">
                <div className="border-b border-gray-800 p-3">
                  <h5 className="font-bold uppercase text-gray-600">Table</h5>
                </div>
                <div className="p-5">
                  <table className="w-full p-5 text-gray-700">
                    <thead>
                      <tr>
                        <th className="text-left text-gray-600">Name</th>
                        <th className="text-left text-gray-600">Side</th>
                        <th className="text-left text-gray-600">Role</th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td>Obi Wan Kenobi</td>
                        <td>Light</td>
                        <td>Jedi</td>
                      </tr>
                      <tr>
                        <td>Greedo</td>
                        <td>South</td>
                        <td>Scumbag</td>
                      </tr>
                      <tr>
                        <td>Darth Vader</td>
                        <td>Dark</td>
                        <td>Sith</td>
                      </tr>
                    </tbody>
                  </table>

                  <p className="py-2">
                    <a href="#" className="text-white">
                      See More issues...
                    </a>
                  </p>
                </div>
              </div>
              {/* <!--/table Card--> */}
            </div>
          </div>

          {/* <!--/ Console Content--> */}
        </div>
      </div>
      {/* <!--/container--> */}
      <Footer />
    </div>
  );
}
