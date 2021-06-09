window.onload = () => {
    loadPlaces().then((position) => renderPlace(position));
};

var loadPlaces = function(options) {
    return new Promise(function (resolve, reject) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
        } else {
            resolve({
                // Location of Area
                coords: {
                    latitude: 56.22880303003221,
                    longitude: 12.830753442703985,
                }
            });
        }
    });
}

// Solution found here: https://stackoverflow.com/questions/7477003/calculating-new-longitude-latitude-from-old-n-meters
var moveLatitude = function(latitude, meters) {
    var earth = 6378.137,  //radius of the earth in kilometer
    pi = Math.PI,
    m = (1 / ((2 * pi / 360) * earth)) / 1000;  //1 meter in degree

    return latitude + (meters * m);
}
var moveLongitude = function(longitude, latitude, meters) {
    var earth = 6378.137,  //radius of the earth in kilometer
    pi = Math.PI,
    cos = Math.cos,
    m = (1 / ((2 * pi / 360) * earth)) / 1000;  //1 meter in degree

    return longitude + (meters * m) / cos(latitude * (pi / 180));
}

var renderPlace = function(place) {
    let scene = document.querySelector('a-scene');

    let latitude = place.coords.latitude;
    let longitude = place.coords.longitude;

    // Move it just a little off so it's not right on top of them
    latitude = moveLatitude(latitude, 15);
    longitude = moveLongitude(longitude, latitude, 15);

    let model = document.createElement('a-entity');
    model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);
    model.setAttribute('glb-model', 'https://samhallsbyggnadlaholm.github.io/MellbystrandCentrum/assets/asset.glb');
    model.setAttribute('rotation', '0 0 0');
    model.setAttribute('scale', '0.2 0.2 0.2');

    model.addEventListener('loaded', () => {
        window.dispatchEvent(new CustomEvent('gps-entity-place-loaded'))
    });

    scene.appendChild(model);
}