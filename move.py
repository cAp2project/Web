import os
import shutil

# move.py
def move_files(file1_path, file2_path, destination_folder):
    # 파일 1과 파일 2가 존재하는지 확인
    if not os.path.isfile(file1_path):
        print(f"File '{file1_path}' does not exist.")
        return
    if not os.path.isfile(file2_path):
        print(f"File '{file2_path}' does not exist.")
        return

    # 목적지 폴더가 존재하지 않으면 생성
    if not os.path.exists(destination_folder):
        os.makedirs(destination_folder)

    # 파일 1 이동
    file1_name = os.path.basename(file1_path)
    destination_path1 = os.path.join(destination_folder, file1_name)
    shutil.move(file1_path, destination_path1)
    print(f"Moved '{file1_name}' to '{destination_folder}'")

    # 파일 2 이동
    file2_name = os.path.basename(file2_path)
    destination_path2 = os.path.join(destination_folder, file2_name)
    shutil.move(file2_path, destination_path2)
    print(f"Moved '{file2_name}' to '{destination_folder}'")

# 사용 예시
file1_path = 'C:/Users/ajach/Downloads/1.jpg'  # 이동할 jpg 파일 경로
file2_path = 'C:/Users/ajach/Downloads/1gps.txt'  # 이동할 txt 파일 경로
destination_folder = 'pothole'  # 목적지 폴더 경로

move_files(file1_path, file2_path, destination_folder)

def format_gps_file(input_file):
    try:
        # 1gps.txt 파일 읽기
        with open(input_file, 'r') as file:
            content = file.read().strip()
        
        # 기존 내용에서 위도와 경도 추출
        parts = content.split()  # 공백을 기준으로 분리
        if len(parts) >= 2:
            latitude = parts[0]
            longitude = parts[1]
            
            # "위도,경도" 형식으로 변경
            formatted_content = f"{latitude},{longitude}"
            
            # 1gps.txt 파일에 다시 쓰기
            with open(input_file, 'w') as file:
                file.write(formatted_content)
            
            print(f"Formatted GPS data: {formatted_content}")
        else:
            print("Error: GPS data format is invalid.")
    except FileNotFoundError:
        print(f"Error: {input_file} not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

# 함수 호출 예시
format_gps_file('pothole/1gps.txt')