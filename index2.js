window.onload = function() {
    var mapOptions = {
        center: new naver.maps.LatLng(33.46, 126.5626562), // 초기 지도 중심 좌표
        zoom: 17 // 줌 레벨
    };
    var map = new naver.maps.Map('map', mapOptions);

    // 마커에 사용할 데이터 배열
    var markersData = [
        {
            lat: 33.460306667,
            lng: 126.562876667,
            imagePath: 'pothole/1.jpg'
        },
        {
            lat: 33.461415,
            lng: 126.564345,
            imagePath: 'pothole/2.jpg'
        },
        {
            lat: 33.460158333,
            lng: 126.56267,
            imagePath: 'pothole/3.jpg'
        }
    ];

    // 마커 생성 및 정보창 추가
    markersData.forEach(function(data) {
        var marker = new naver.maps.Marker({
            position: new naver.maps.LatLng(data.lat, data.lng),
            map: map
        });

        // 정보창 설정
        var infowindow = new naver.maps.InfoWindow({
            content: `
                <div style="text-align: center;">
                    <img src="${data.imagePath}" width="350" height="210" alt="포트홀 이미지" /><br>
                    <h3>포트홀 위치 정보</h3>
                    <p>위도: ${data.lat.toFixed(6)} / 경도: ${data.lng.toFixed(6)}</p>
                </div>
            `
        });

        // 마커 클릭 시 정보창 토글
        naver.maps.Event.addListener(marker, "click", function() {
            if (infowindow.getMap()) {
                infowindow.close();
            } else {
                infowindow.open(map, marker);
            }
        });

        console.log("Marker added at:", data.lat, data.lng);
    });
};
