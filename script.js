window.onload = () => {
    const button = document.querySelector('button[data-action="change"]');
    button.innerText = 'Kartor';

    let places = staticLoadPlaces();
    renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: 'Kartor',
            location: {
                 lat: 56.513404,
                 lng: 12.948563,
            },
        },
    ];
}

var models = [
    {
        url: './assets/orto.glb',
        scale: '2 2 2',
        info: 'Ortofoto 2020',
		rotation: '0 -5 0',
		//position: '0 0 0',
    },
    {
        url: './assets/EkKartaModel.glb',
        scale: '5 5 5',
        info: 'Ekonomisk karta 1920',
		rotation: '0 -5 0',
		//position: '0 0 0',
    },
];

var modelIndex = 0;
var setModel = function (model, entity) {
    if (model.scale) {
        entity.setAttribute('scale', model.scale);
    }

    if (model.rotation) {
        entity.setAttribute('rotation', model.rotation);
    }

    if (model.position) {
        entity.setAttribute('position', model.position);
    }

    entity.setAttribute('gltf-model', model.url);

    const div = document.querySelector('.instructions');
    div.innerText = model.info;
};

function renderPlaces(places) {
    let scene = document.querySelector('a-scene');

    places.forEach((place) => {
        let latitude = place.location.lat;
        let longitude = place.location.lng;

        let model = document.createElement('a-entity');
        model.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude};`);

        setModel(models[modelIndex], model);

        //model.setAttribute('animation-mixer', '');

        document.querySelector('button[data-action="change"]').addEventListener('click', function () {
            var entity = document.querySelector('[gps-entity-place]');
            modelIndex++;
            var newIndex = modelIndex % models.length;
            setModel(models[newIndex], entity);
        });

        scene.appendChild(model);
    });
}