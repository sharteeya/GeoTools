map = L.map('map').setView([22.733193, 120.284587], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '<a href="https://www.openstreetmap.org/">OSM</a>',
    maxZoom: 18,
}).addTo(map);

let markers = []
let markerList = document.getElementById('markerList')
function addMarkers(){
    texts = document.getElementById('coordinates').value;
    coordinates = JSON.parse(document.getElementById('coordinates').value);
    if(!Array.isArray(coordinates)){
        return;
    }
    coordinates.map((coor, i) => {
        if(Array.isArray(coor)){
            let marker = L.marker(coor);
            marker.addTo(map);
            marker.bindPopup(`${coor}`);
            markers.push(marker);
            markerList.innerHTML += `<tr>
                                        <th scope="row">${markers.length}</th>
                                        <td>${coor[0]}</td>
                                        <td>${coor[1]}</td>
                                        <td>
                                            <button type="button" class="btn btn-success" onclick="moveCenterTo(${coor[0]},${coor[1]})">MoveTo</button>
                                            <button type="button" class="btn btn-danger" onclick="removeMarker(${markers.length-1}, this)">Remove</button>
                                        </td>
                                    </tr>`;
        }else{

        }
    });
}

function removeMarker(index, element){
    map.removeLayer(markers[index]);
    let e = element.parentElement.parentElement;
    e.remove();
}

function moveCenterTo(lat, lng){
    map.panTo(new L.LatLng(lat, lng));
}