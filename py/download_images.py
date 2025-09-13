import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

# Папка для сохранения картинок
os.makedirs("images", exist_ok=True)

# Главная страница архива
base_url = "https://web.archive.org/web/20240419144035/http://oboandhobos.pro/"

def download_image(img_url, filename):
    try:
        r = requests.get(img_url)
        r.raise_for_status()
        with open(os.path.join("images", filename), "wb") as f:
            f.write(r.content)
        print(f"Скачано: {filename}")
    except Exception as e:
        print(f"Ошибка при скачивании {img_url}: {e}")

def sanitize_name(name):
    return name.strip().replace(" ", "_").replace("/", "_").replace("\\", "_")

def process_page(url, prefix):
    """Скачивает все картинки со страницы и сохраняет с префиксом"""
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    images = soup.find_all("img")

    for img in images:
        img_url = img.get("src")
        if not img_url:
            continue
        if img_url.startswith("/"):
            img_url = urljoin("https://web.archive.org", img_url)
        alt_text = img.get("alt", "unknown")
        filename = f"{prefix}_{sanitize_name(alt_text)}.jpg"
        download_image(img_url, filename)

# 1️⃣ Главная страница: ищем ссылки на альбомы и артистов
response = requests.get(base_url)
soup = BeautifulSoup(response.text, "html.parser")
links = soup.find_all("a")

for link in links:
    href = link.get("href")
    if not href:
        continue
    full_url = urljoin(base_url, href)
    text = link.get_text(strip=True)
    if not text:
        continue

    # Определяем тип страницы
    if "album" in href.lower() or "album" in text.lower():
        process_page(full_url, "album")
    elif "artist" in href.lower() or "artist" in text.lower():
        process_page(full_url, f"artist_{text.upper()}")

