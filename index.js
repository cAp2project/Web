var mapOptions = {
    center: new naver.maps.LatLng(33.3616666, 126.5291666), // 제주도의 중심 좌표
    zoom: 10.8, // 제주도를 전체적으로 볼 수 있는 줌 레벨
    scaleControl: true,
    logoControl: false,
    mapDataControl: false,
    minZoom: 6,
    zoomControl: true,
    zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.TOP_RIGHT
    }
};

window.onload = function() {
    // mapOptions를 사용하여 지도 생성
    var map = new naver.maps.Map('map', mapOptions);

    // 마커 생성
    var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(33.4547583, 126.5622562), // 마커 위치 (제주도 내 위치)
        map: map // 마커가 표시될 지도
    });
};


var map = new naver.maps.Map(document.getElementById('map'), mapOptions);

