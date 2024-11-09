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
    // 지도 생성
    var map = new naver.maps.Map('map', mapOptions);

    // 마커 생성
    var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(33.4547583, 126.5622562), // 제주도 내 마커 위치
        map: map // 마커가 표시될 지도
    });

    // 인포윈도우 내용
    var contentString = `
        <div class="iw_inner">
            <h3>위치 문구</h3>
            <p>
                포트홀 위치입니다.<br />
                <img src="pothole.jpg" class="thumb" alt="제주도" />
            </p>
        </div>
    `;

    var infowindow = new naver.maps.InfoWindow({
        content: contentString
    });

    // 마커 클릭 이벤트
    naver.maps.Event.addListener(marker, "click", function(e) {
        if (infowindow.getMap()) {
            infowindow.close();
        } else {
            infowindow.open(map, marker);
        }
    });
};
