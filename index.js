window.onload = function() {
    var mapOptions = {
        center: new naver.maps.LatLng(33.4547583, 126.5622562), // Set initial map center
        zoom: 10 // Adjust zoom level as needed
    };
    var map = new naver.maps.Map('map', mapOptions);

    // Paths to the pothole image and GPS file
    var imagePath = 'pothole/1.jpg';  // Update path if necessary
    var gpsPath = 'pothole/1gps.txt'; // Update path if necessary

    // Display the pothole image
    var img = document.getElementById('pothole-image');
    img.src = imagePath;
    img.style.display = 'block';

    // Error handling for image loading
    img.onerror = function() {
        console.error("Image failed to load. Check the path:", imagePath);
    };
    img.onload = function() {
        console.log("Image loaded successfully:", imagePath);
    };

    // Fetch GPS data and parse latitude and longitude
    fetch(gpsPath)
        .then(response => {
            if (!response.ok) throw new Error('GPS file not found at path: ' + gpsPath);
            return response.text();
        })
        .then(text => {
            document.getElementById('gps-data').textContent = text;
            document.getElementById('gps-data').style.display = 'block';

            // Extract latitude and longitude from the file
            var [lat, lng] = text.split(',').map(coord => parseFloat(coord.trim()));

            if (isNaN(lat) || isNaN(lng)) {
                console.error("Invalid GPS data:", lat, lng);
                return;
            }

            // Create a marker based on latitude and longitude
            var marker = new naver.maps.Marker({
                position: new naver.maps.LatLng(lat, lng),
                map: map
            });

            // Define info window content
            var infowindow = new naver.maps.InfoWindow({
                content: [
                    '<div class="iw_inner" style="text-align: center;">',
                    '   <img src="' + imagePath + '" width="350" height="210" alt="포트홀 이미지" class="thumb" /><br>',
                    '   <h3>포트홀 위치 정보</h3>',
                    '   <p>위도: ' + lat.toFixed(6) + ' / 경도: ' + lng.toFixed(6) + '</p>',
                    '</div>'
                ].join('')
            });

            // Toggle the infowindow on marker click
            naver.maps.Event.addListener(marker, "click", function() {
                infowindow.getMap() ? infowindow.close() : infowindow.open(map, marker);
            });
        })
        .catch(error => console.error('Error fetching GPS data or invalid data format:', error));
};
