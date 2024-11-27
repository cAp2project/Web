// 네이버 지도 초기화
const map = new naver.maps.Map('map', {
    center: new naver.maps.LatLng(33.450701, 126.570667), // 초기 중심 좌표
    zoom: 15, // 초기 줌 레벨
});

// 마커 데이터 가져오기
fetch('/markers')
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            data.markers.forEach(marker => {
                const [latitude, longitude] = marker.content.split(' ').map(Number);
                const imageUrl = `/image/${marker.image_filename}`;

                // 마커 생성
                const mapMarker = new naver.maps.Marker({
                    position: new naver.maps.LatLng(latitude, longitude),
                    map: map,
                });

                // 마커 클릭 이벤트
                naver.maps.Event.addListener(mapMarker, 'click', () => {
                    const infoWindow = new naver.maps.InfoWindow({
                        content: `<div style="text-align: center;">
                            <img src="${imageUrl}" alt="${marker.image_filename}" style="width: 100%; max-height: 200px;" />
                            <p>${marker.filename}</p>
                        </div>`,
                    });

                    // 팝업 열기
                    infoWindow.open(map, mapMarker);
                });
            });
        } else {
            console.error('Failed to load markers:', data.error);
        }
    })
    .catch(error => console.error('Error fetching marker data:', error));

/* 파일로부터 불러오기
window.onload = async function() {
    var mapOptions = {
        center: new naver.maps.LatLng(33.46, 126.5626562), // 초기 지도 중심 좌표
        zoom: 17 // 줌 레벨
    };
    var map = new naver.maps.Map('map', mapOptions);

    // pothole 이미지 및 GPS 파일 정보
    var filesData = [
        { gpsPath: 'pothole/1gps.txt', imagePath: 'pothole/1.jpg' },
        { gpsPath: 'pothole/2gps.txt', imagePath: 'pothole/2.jpg' },
        { gpsPath: 'pothole/3gps.txt', imagePath: 'pothole/3.jpg' }
    ];

    // 텍스트 파일에서 GPS 데이터를 읽는 함수
    async function readGPSData(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error(`Failed to fetch ${filePath}`);
            const text = await response.text();
            const [lat, lng] = text.trim().split(/\s+/).map(Number); // 띄어쓰기로 구분하여 위도와 경도 추출
            return { lat, lng };
        } catch (error) {
            console.error("Error reading GPS data:", error);
            return null;
        }
    }

    // markersData 배열을 동적으로 생성
    var markersData = [];
    for (const file of filesData) {
        const gpsData = await readGPSData(file.gpsPath);
        if (!gpsData) continue; // GPS 데이터 읽기에 실패하면 건너뜀

        markersData.push({
            lat: gpsData.lat,
            lng: gpsData.lng,
            imagePath: file.imagePath
        });
    }

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
*/