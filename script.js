// DOM 요소 선택
document.addEventListener('DOMContentLoaded', () => {
    // 기본 UI 요소
    const moodButtons = document.querySelectorAll('.mood-btn');
    const weatherButtons = document.querySelectorAll('.weather-btn');
    const peopleButtons = document.querySelectorAll('.people-btn');
    const activityInput = document.getElementById('activity-input');
    const addBtn = document.getElementById('add-btn');
    const customActivitiesList = document.getElementById('custom-activities');
    const generateBtn = document.getElementById('generate-btn');
    const resultDiv = document.getElementById('result');
    const moreBtn = document.getElementById('more-btn');
    
    // 팝업 관련 요소
    const activityPopup = document.getElementById('activity-popup');
    const closePopup = document.querySelector('.close-popup');
    const popupTitle = document.getElementById('popup-title');
    const popupDescription = document.getElementById('popup-description');
    const popupMood = document.getElementById('popup-mood');
    const popupWeather = document.getElementById('popup-weather');
    const popupPeople = document.getElementById('popup-people');
    
    // 상태 변수
    let selectedMood = 'all';
    let selectedWeather = 'any';
    let selectedPeople = 'any';
    let customActivities = [];
    let filteredActivities = [];
    let currentActivityIndex = 0;
    
    // 기본 활동 데이터
    const activityData = [
        {
            title: '보드게임 카페',
            description: '다양한 보드게임을 즐길 수 있는 보드게임 카페에서 시간을 보내보세요. 전략 게임부터 파티 게임까지 취향에 맞는 게임을 선택할 수 있어요.',
            mood: ['relaxed', 'creative'],
            weather: ['rainy', 'cold', 'any'],
            people: ['2', '3-4', '5+', 'any']
        },
        {
            title: '방탈출 게임',
            description: '친구들과 함께 방탈출 게임에 도전해보세요. 다양한 테마의 방에서 문제를 해결하고 시간 내에 탈출하는 짜릿한 경험을 할 수 있어요.',
            mood: ['energetic', 'adventurous'],
            weather: ['rainy', 'cold', 'hot', 'any'],
            people: ['3-4', '5+', 'any']
        },
        {
            title: '영화 관람',
            description: '최신 영화를 함께 보며 이야기를 나눠보세요. 액션, 코미디, 공포 등 취향에 맞는 장르를 고르는 것도 재미있는 경험이 될 수 있어요.',
            mood: ['relaxed'],
            weather: ['rainy', 'hot', 'cold', 'any'],
            people: ['2', '3-4', '5+', 'any']
        },
        {
            title: '피크닉',
            description: '근처 공원이나 한강에서 피크닉을 즐겨보세요. 간단한 음식과 음료를 준비하고 자연 속에서 여유로운 시간을 보낼 수 있어요.',
            mood: ['relaxed', 'creative'],
            weather: ['sunny'],
            people: ['2', '3-4', '5+', 'any']
        },
        {
            title: '등산',
            description: '가까운 산이나 트레킹 코스를 찾아 자연 속에서 하이킹을 즐겨보세요. 정상에서 바라보는 경치와 함께 성취감도 느낄 수 있어요.',
            mood: ['energetic', 'adventurous'],
            weather: ['sunny', 'cold'],
            people: ['2', '3-4', '5+', 'any']
        },
        {
            title: '노래방',
            description: '함께 노래를 부르며 스트레스를 해소해보세요. 좋아하는 노래를 열창하거나 듀엣 곡을 불러보는 것도 좋은 추억이 될 수 있어요.',
            mood: ['energetic', 'creative'],
            weather: ['rainy', 'cold', 'hot', 'any'],
            people: ['2', '3-4', '5+', 'any']
        },
        {
            title: '실내 클라이밍',
            description: '실내 클라이밍장에서 암벽 등반에 도전해보세요. 초보자부터 전문가까지 다양한 난이도의 코스가 준비되어 있어요.',
            mood: ['energetic', 'adventurous'],
            weather: ['rainy', 'hot', 'cold', 'any'],
            people: ['2', '3-4', 'any']
        },
        {
            title: '요리 클래스',
            description: '함께 요리 클래스에 참여해 새로운 요리를 배워보세요. 직접 만든 음식을 나눠 먹는 즐거움도 경험할 수 있어요.',
            mood: ['creative', 'relaxed'],
            weather: ['rainy', 'cold', 'hot', 'any'],
            people: ['2', '3-4', 'any']
        },
        {
            title: '자전거 여행',
            description: '자전거를 타고 주변 지역을 탐험해보세요. 한강 자전거 도로나 근처 공원 코스를 따라가며 풍경을 즐길 수 있어요.',
            mood: ['energetic', 'adventurous'],
            weather: ['sunny'],
            people: ['2', '3-4', 'any']
        },
        {
            title: '카페 투어',
            description: '특색 있는 카페들을 찾아다니며 다양한 음료와 디저트를 맛보세요. 인스타그램 명소를 방문하거나 숨겨진 보석 같은 카페를 발견할 수도 있어요.',
            mood: ['relaxed'],
            weather: ['rainy', 'cold', 'hot', 'sunny', 'any'],
            people: ['2', '3-4', 'any']
        },
        {
            title: '방 꾸미기',
            description: '함께 방이나 공간을 꾸며보세요. DIY 소품을 만들거나 가구 배치를 바꾸는 등 창의력을 발휘할 수 있어요.',
            mood: ['creative', 'relaxed'],
            weather: ['rainy', 'cold', 'hot', 'any'],
            people: ['2', '3-4', 'any']
        },
        {
            title: '온천/스파',
            description: '온천이나 스파에서 휴식을 취해보세요. 따뜻한 물에서 피로를 풀고 마사지를 받으며 재충전의 시간을 가질 수 있어요.',
            mood: ['relaxed'],
            weather: ['cold', 'rainy', 'any'],
            people: ['2', '3-4', 'any']
        },
        {
            title: '전시회 관람',
            description: '미술관이나 박물관에서 전시회를 관람해보세요. 예술 작품을 감상하며 대화를 나누는 지적인 시간을 보낼 수 있어요.',
            mood: ['relaxed', 'creative'],
            weather: ['rainy', 'hot', 'cold', 'any'],
            people: ['2', '3-4', 'any']
        },
        {
            title: '스케이트/롤러블레이드',
            description: '스케이트장이나 롤러스케이트 공원에서 스케이팅을 즐겨보세요. 초보자라도 함께 배우며 즐길 수 있어요.',
            mood: ['energetic', 'adventurous'],
            weather: ['sunny', 'cold'],
            people: ['2', '3-4', '5+', 'any']
        },
        {
            title: '플라워 클래스',
            description: '플라워 클래스에 참여해 꽃꽂이나 화환 만들기를 배워보세요. 직접 만든 작품을 집에 가져갈 수도 있어요.',
            mood: ['creative', 'relaxed'],
            weather: ['rainy', 'cold', 'hot', 'any'],
            people: ['2', '3-4', 'any']
        },
        {
            title: '밤 산책',
            description: '밤에 조명이 예쁜 장소나 강변을 산책해보세요. 야경을 감상하며 대화를 나누는 로맨틱한 시간을 보낼 수 있어요.',
            mood: ['relaxed', 'adventurous'],
            weather: ['sunny', 'cold'],
            people: ['2', '3-4', 'any']
        },
        {
            title: '실내 스포츠',
            description: '실내 스포츠 센터에서 배드민턴, 탁구, 볼링 등 다양한 스포츠를 즐겨보세요. 가벼운 운동으로 활력을 찾을 수 있어요.',
            mood: ['energetic'],
            weather: ['rainy', 'cold', 'hot', 'any'],
            people: ['2', '3-4', '5+', 'any']
        },
        {
            title: '영화 마라톤',
            description: '시리즈 영화나 좋아하는 감독의 작품을 모아 영화 마라톤을 해보세요. 간식을 준비하고 편안한 공간에서 영화 여행을 떠날 수 있어요.',
            mood: ['relaxed'],
            weather: ['rainy', 'cold', 'hot', 'any'],
            people: ['2', '3-4', 'any']
        },
        {
            title: '캠핑',
            description: '근처 캠핑장에서 하룻밤을 보내보세요. 텐트를 치고 바비큐를 즐기며 자연 속에서 특별한 경험을 할 수 있어요.',
            mood: ['adventurous', 'relaxed'],
            weather: ['sunny'],
            people: ['2', '3-4', '5+', 'any']
        },
        {
            title: '공연 관람',
            description: '콘서트, 뮤지컬, 연극 등 다양한 공연을 관람해보세요. 라이브 공연의 에너지를 느끼며 즐거운 시간을 보낼 수 있어요.',
            mood: ['energetic', 'creative'],
            weather: ['rainy', 'cold', 'hot', 'any'],
            people: ['2', '3-4', '5+', 'any']
        },
        {
            title: '이색 체험',
            description: '도예, 가죽 공예, 향수 만들기 등 이색 체험을 해보세요. 새로운 취미를 발견하고 직접 만든 작품을 기념품으로 가져갈 수 있어요.',
            mood: ['creative'],
            weather: ['rainy', 'cold', 'hot', 'any'],
            people: ['2', '3-4', 'any']
        },
        {
            title: '야시장 탐방',
            description: '주말 야시장이나 플리마켓을 방문해보세요. 다양한 먹거리와 특색 있는 상품들을 구경하며 즐거운 시간을 보낼 수 있어요.',
            mood: ['adventurous', 'energetic'],
            weather: ['sunny', 'hot'],
            people: ['2', '3-4', '5+', 'any']
        },
        {
            title: '팝업 스토어 방문',
            description: '요즘 인기 있는 팝업 스토어나 전시회를 찾아가보세요. 한정된 기간에만 열리는 특별한 공간을 경험할 수 있어요.',
            mood: ['creative', 'adventurous'],
            weather: ['rainy', 'cold', 'hot', 'sunny', 'any'],
            people: ['2', '3-4', 'any']
        },
        {
            title: '롤러코스터 타기',
            description: '놀이공원에서 롤러코스터와 다양한 어트랙션을 즐겨보세요. 스릴과 재미를 동시에 느낄 수 있어요.',
            mood: ['energetic', 'adventurous'],
            weather: ['sunny'],
            people: ['2', '3-4', '5+', 'any']
        }
    ];
    
    // 로컬 스토리지에서 사용자 정의 활동 불러오기
    function loadCustomActivities() {
        const saved = localStorage.getItem('friendActivityCustom');
        if (saved) {
            customActivities = JSON.parse(saved);
            renderCustomActivities();
        }
    }
    
    // 사용자 정의 활동 저장
    function saveCustomActivities() {
        localStorage.setItem('friendActivityCustom', JSON.stringify(customActivities));
    }
    
    // 사용자 정의 활동 렌더링
    function renderCustomActivities() {
        customActivitiesList.innerHTML = '';
        
        if (customActivities.length === 0) {
            const emptyItem = document.createElement('li');
            emptyItem.textContent = '추가한 활동이 없습니다';
            emptyItem.style.color = '#999';
            emptyItem.style.textAlign = 'center';
            customActivitiesList.appendChild(emptyItem);
            return;
        }
        
        customActivities.forEach((activity, index) => {
            const li = document.createElement('li');
            li.className = 'fade-in';
            
            const activityText = document.createElement('span');
            activityText.textContent = activity.title;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '삭제';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => {
                removeCustomActivity(index);
            });
            
            li.appendChild(activityText);
            li.appendChild(deleteBtn);
            customActivitiesList.appendChild(li);
        });
    }
    
    // 사용자 정의 활동 추가
    function addCustomActivity() {
        const activityName = activityInput.value.trim();
        
        if (activityName === '') {
            activityInput.classList.add('shake');
            setTimeout(() => {
                activityInput.classList.remove('shake');
            }, 500);
            return;
        }
        
        // 중복 활동 확인
        const isDuplicate = customActivities.some(activity => 
            activity.title.toLowerCase() === activityName.toLowerCase()
        );
        
        if (isDuplicate) {
            alert('이미 추가한 활동입니다.');
            activityInput.value = '';
            return;
        }
        
        const newActivity = {
            title: activityName,
            description: '내가 추가한 맞춤 활동입니다.',
            mood: [selectedMood !== 'all' ? selectedMood : 'creative'],
            weather: [selectedWeather !== 'any' ? selectedWeather : 'any'],
            people: [selectedPeople !== 'any' ? selectedPeople : 'any']
        };
        
        customActivities.push(newActivity);
        activityInput.value = '';
        saveCustomActivities();
        renderCustomActivities();
    }
    
    // 사용자 정의 활동 삭제
    function removeCustomActivity(index) {
        customActivities.splice(index, 1);
        saveCustomActivities();
        renderCustomActivities();
    }
    
    // 필터링된 활동 얻기
    function getFilteredActivities() {
        // 기본 활동과 사용자 정의 활동 합치기
        const allActivities = [...activityData, ...customActivities];
        
        // 선택한 조건에 맞는 활동만 필터링
        return allActivities.filter(activity => {
            const moodMatch = selectedMood === 'all' || activity.mood.includes(selectedMood);
            const weatherMatch = selectedWeather === 'any' || activity.weather.includes(selectedWeather) || activity.weather.includes('any');
            const peopleMatch = selectedPeople === 'any' || activity.people.includes(selectedPeople) || activity.people.includes('any');
            
            return moodMatch && weatherMatch && peopleMatch;
        });
    }
    
    // 활동 추천 보여주기
    function showRecommendation() {
        filteredActivities = getFilteredActivities();
        
        if (filteredActivities.length === 0) {
            resultDiv.innerHTML = `
                <div class="activity-card">
                    <p>선택한 조건에 맞는 활동이 없습니다. 다른 조건을 선택해보세요!</p>
                </div>
            `;
            moreBtn.style.display = 'none';
            return;
        }
        
        // 랜덤으로 활동 선택
        currentActivityIndex = Math.floor(Math.random() * filteredActivities.length);
        const activity = filteredActivities[currentActivityIndex];
        
        // 분위기, 날씨, 인원수 태그 텍스트 생성
        const moodText = getMoodText(activity.mood[0]);
        const weatherText = getWeatherText(activity.weather[0] === 'any' ? 'any' : activity.weather[0]);
        const peopleText = getPeopleText(activity.people[0] === 'any' ? 'any' : activity.people[0]);
        
        resultDiv.innerHTML = `
            <div class="activity-card" id="activity-card">
                <h3>${activity.title}</h3>
                <p>${activity.description.substring(0, 50)}${activity.description.length > 50 ? '...' : ''}</p>
                <div class="activity-tags">
                    <span class="tag mood-tag">${moodText}</span>
                    <span class="tag weather-tag">${weatherText}</span>
                    <span class="tag people-tag">${peopleText}</span>
                </div>
            </div>
        `;
        
        // 활동 카드 클릭 이벤트 - 팝업 표시
        document.getElementById('activity-card').addEventListener('click', () => {
            showActivityDetails(activity);
        });
        
        // 다른 활동 보기 버튼 표시
        if (filteredActivities.length > 1) {
            moreBtn.style.display = 'inline-block';
        } else {
            moreBtn.style.display = 'none';
        }
    }
    
    // 다른 활동 추천 보여주기
    function showNextActivity() {
        if (filteredActivities.length <= 1) return;
        
        // 현재 인덱스를 제외한 랜덤 인덱스 선택
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * filteredActivities.length);
        } while (newIndex === currentActivityIndex && filteredActivities.length > 1);
        
        currentActivityIndex = newIndex;
        const activity = filteredActivities[currentActivityIndex];
        
        // 분위기, 날씨, 인원수 태그 텍스트 생성
        const moodText = getMoodText(activity.mood[0]);
        const weatherText = getWeatherText(activity.weather[0] === 'any' ? 'any' : activity.weather[0]);
        const peopleText = getPeopleText(activity.people[0] === 'any' ? 'any' : activity.people[0]);
        
        const activityCard = document.querySelector('.activity-card');
        activityCard.classList.add('pulse');
        
        setTimeout(() => {
            resultDiv.innerHTML = `
                <div class="activity-card" id="activity-card">
                    <h3>${activity.title}</h3>
                    <p>${activity.description.substring(0, 50)}${activity.description.length > 50 ? '...' : ''}</p>
                    <div class="activity-tags">
                        <span class="tag mood-tag">${moodText}</span>
                        <span class="tag weather-tag">${weatherText}</span>
                        <span class="tag people-tag">${peopleText}</span>
                    </div>
                </div>
            `;
            
            // 활동 카드 클릭 이벤트 - 팝업 표시
            document.getElementById('activity-card').addEventListener('click', () => {
                showActivityDetails(activity);
            });
        }, 300);
    }
    
    // 활동 상세 정보 팝업 표시
    function showActivityDetails(activity) {
        popupTitle.textContent = activity.title;
        popupDescription.textContent = activity.description;
        
        // 분위기, 날씨, 인원수 태그 표시
        popupMood.textContent = getMoodText(activity.mood[0]);
        popupWeather.textContent = getWeatherText(activity.weather[0] === 'any' ? 'any' : activity.weather[0]);
        popupPeople.textContent = getPeopleText(activity.people[0] === 'any' ? 'any' : activity.people[0]);
        
        activityPopup.style.display = 'flex';
    }
    
    // 팝업 닫기
    function closeActivityPopup() {
        activityPopup.style.display = 'none';
    }
    
    // 분위기 텍스트 변환
    function getMoodText(mood) {
        const moodMap = {
            'energetic': '활기찬',
            'relaxed': '여유로운',
            'creative': '창의적인',
            'adventurous': '모험적인',
            'all': '모든 분위기'
        };
        return moodMap[mood] || mood;
    }
    
    // 날씨 텍스트 변환
    function getWeatherText(weather) {
        const weatherMap = {
            'sunny': '맑은 날',
            'rainy': '비 오는 날',
            'cold': '추운 날',
            'hot': '더운 날',
            'any': '모든 날씨'
        };
        return weatherMap[weather] || weather;
    }
    
    // 인원수 텍스트 변환
    function getPeopleText(people) {
        const peopleMap = {
            '2': '둘이서',
            '3-4': '3-4명',
            '5+': '5명 이상',
            'any': '인원 상관없음'
        };
        return peopleMap[people] || people;
    }
    
    // 버튼 클릭 이벤트 - 분위기 선택
    moodButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 이전 선택 제거
            moodButtons.forEach(btn => btn.classList.remove('active'));
            // 현재 버튼 활성화
            button.classList.add('active');
            // 선택한 분위기 저장
            selectedMood = button.dataset.mood;
        });
    });
    
    // 버튼 클릭 이벤트 - 날씨 선택
    weatherButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 이전 선택 제거
            weatherButtons.forEach(btn => btn.classList.remove('active'));
            // 현재 버튼 활성화
            button.classList.add('active');
            // 선택한 날씨 저장
            selectedWeather = button.dataset.weather;
        });
    });
    
    // 버튼 클릭 이벤트 - 인원수 선택
    peopleButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 이전 선택 제거
            peopleButtons.forEach(btn => btn.classList.remove('active'));
            // 현재 버튼 활성화
            button.classList.add('active');
            // 선택한 인원수 저장
            selectedPeople = button.dataset.people;
        });
    });
    
    // 활동 추가 버튼 클릭 이벤트
    addBtn.addEventListener('click', addCustomActivity);
    
    // 활동 입력 엔터키 이벤트
    activityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addCustomActivity();
        }
    });
    
    // 추천 받기 버튼 클릭 이벤트
    generateBtn.addEventListener('click', showRecommendation);
    
    // 다른 활동 보기 버튼 클릭 이벤트
    moreBtn.addEventListener('click', showNextActivity);
    
    // 팝업 닫기 버튼 클릭 이벤트
    closePopup.addEventListener('click', closeActivityPopup);
    
    // 팝업 외부 클릭 시 닫기
    window.addEventListener('click', (e) => {
        if (e.target === activityPopup) {
            closeActivityPopup();
        }
    });
    
    // 초기화 함수
    function init() {
        // 기본 선택 설정
        document.querySelector('.mood-btn[data-mood="all"]').classList.add('active');
        document.querySelector('.weather-btn[data-weather="any"]').classList.add('active');
        document.querySelector('.people-btn[data-people="any"]').classList.add('active');
        
        // 사용자 정의 활동 불러오기
        loadCustomActivities();
    }
    
    // 초기화 실행
    init();
});