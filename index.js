window.onload = function() {
    var mapOptions = {
        center: new naver.maps.LatLng(33.4547583, 126.5622562), // 초기 지도 중심 좌표
        zoom: 10 // 줌 레벨
    };
    var map = new naver.maps.Map('map', mapOptions);

    // 하드코딩된 위도와 경도 값
    var lat = 33.4547583;
    var lng = 126.5622562;

    // 마커 생성
    var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(lat, lng),
        map: map
    });

    // 포트홀 이미지 경로
    var imagePath = 'pothole/1.jpg'; // 이미지 경로를 설정합니다.

    // 정보창 설정
    var infowindow = new naver.maps.InfoWindow({
        content: `
            <div style="text-align: center;">
                <img src="${imagePath}" width="350" height="210" alt="포트홀 이미지" /><br>
                <h3>포트홀 위치 정보</h3>
                <p>위도: ${lat.toFixed(6)} / 경도: ${lng.toFixed(6)}</p>
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

    console.log("Marker added at:", lat, lng);

    // 포트홀 이미지 표시
    var img = document.getElementById('pothole-image');
    img.src = imagePath;
    img.style.display = 'block';

    img.onerror = function() {
        console.error("Image failed to load. Check the path:", imagePath);
    };
    img.onload = function() {
        console.log("Image loaded successfully:", imagePath);
    };
};
