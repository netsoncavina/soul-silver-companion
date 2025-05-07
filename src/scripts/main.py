from bs4 import BeautifulSoup
from pathlib import Path
from urllib.parse import unquote
import requests
import json
import re
from slugify import slugify
import os

POKEMON_EXP_URL = "https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_experience_type"
POKEMON_EXP_OUTPUT_FILE = "pokemon_exp_type.json"
TRAINER_INFO_URL = "https://www.pokemythology.net/detonados/detonado-heartgold-soulsilver/"
BADGES_URL       = "https://bulbapedia.bulbagarden.net/wiki/Badge"
GYM_LEADERS_URL  = "https://pokemondb.net/heartgold-soulsilver/gymleaders-elitefour"

def build_pokemon_json(pokemon_dex_num,
                      pokemon_img_POKEMON_EXP_URL,
                      pokemon_name,
                      pokemon_exp_type):
    return {
        "dex_num": pokemon_dex_num.strip(),
        "name": pokemon_name.strip(),
        "img_POKEMON_EXP_URL": pokemon_img_POKEMON_EXP_URL.strip() if pokemon_img_POKEMON_EXP_URL else None,
        "exp_type": pokemon_exp_type.strip()
    }

def fetch_pokemon_data():
    try:
        response = requests.get(POKEMON_EXP_URL, timeout=10)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Error fetching page: {e}")
        return []

    soup = BeautifulSoup(response.text, "html.parser")
    tbody = soup.find("tbody")
    if not tbody:
        print("No table body found on the page.")
        return []

    rows = tbody.find_all("tr")[1:]
    pokemon_list = []
    for row in rows:
        cols = row.find_all("td")
        if len(cols) < 4:
            continue
        dex_num = cols[0].get_text()
        img_tag = cols[1].find("img")
        raw_img_POKEMON_EXP_URL = img_tag.get('src') if img_tag else None
        if raw_img_POKEMON_EXP_URL and "/70px-" in raw_img_POKEMON_EXP_URL:
            img_POKEMON_EXP_URL = raw_img_POKEMON_EXP_URL.replace("/70px-", "/720px-")
        else:
            img_POKEMON_EXP_URL = raw_img_POKEMON_EXP_URL
        name = cols[2].get_text()
        exp_type = cols[3].get_text()

        pokemon_list.append(
            build_pokemon_json(
                pokemon_dex_num=dex_num,
                pokemon_img_POKEMON_EXP_URL=img_POKEMON_EXP_URL,
                pokemon_name=name,
                pokemon_exp_type=exp_type
            )
        )
    return pokemon_list

def save_pokemon_data_to_json(pokemon_list, filename):
    target_path = Path(__file__).parent / "../assets" / filename
    target_path.parent.mkdir(parents=True, exist_ok=True)

    with open(target_path, "w", encoding="utf-8") as f:
        json.dump(pokemon_list, f, indent=4, ensure_ascii=False)

    print(f"Saved {len(pokemon_list)} entries to {target_path}")

def initialize_pokemon_data():
    pokemon_data = fetch_pokemon_data()
    if pokemon_data:
        save_pokemon_data_to_json(pokemon_data, POKEMON_EXP_OUTPUT_FILE)
    else:
        print("No Pokémon data found.")


def fetch_trainer_data():
    try:
        response = requests.get(TRAINER_INFO_URL, timeout=10)
        response.raise_for_status()
    except requests.RequestException as e:
        print(f"Error fetching trainer info page: {e}")
        return []

    soup = BeautifulSoup(response.text, "html.parser")

    trainer_battle_data = fetch_trainer_battle_days(soup, response.text)
    battle_map = {}
    for entry in trainer_battle_data:
        battle_map.setdefault(entry['trainer_name'], []).append({
            'day': entry['day'],
            'time': entry['time']
        })

    try:
        resp2 = requests.get(GYM_LEADERS_URL, timeout=10)
        resp2.raise_for_status()
        gym_html = resp2.text
    except requests.RequestException as e:
        print(f"Error fetching gym leaders page: {e}")
        gym_html = ""
    gym_data = parse_gyms(gym_html)

    badge_list = parse_badges(BADGES_URL)
    badge_map = {
        slugify(item['gym_leader']): item['badge_image']
        for item in badge_list
    }

    trainer_table = soup.find("table", id="table17")
    if not trainer_table:
        print("No trainer table found on the page.")
        return []
    rows = trainer_table.find_all("tr")

    trainer_list = []
    for row in rows[1:]:
        cols = row.find_all("td")
        if len(cols) < 2:
            continue

        trainer_picture = cols[1].find("img").get('src') if cols[1].find("img") else None
        encounter_location_img = (
            f'https://www.pokemythology.net{cols[0].find("img").get("src")}'
            if cols[0].find("img") else None
        )
        lines = cols[1].get_text(separator="\n", strip=True).splitlines()
        trainer_name       = lines[0].split("Líder:", 1)[1].strip()
        encounter_location = lines[1].split("Lugar:",   1)[1].strip()
        encounter_when     = lines[2].split("Quando:",  1)[1].strip()
        requirements       = lines[3].split("Requer:",   1)[1].strip()

        base = build_trainer_json(
            trainer_name=trainer_name,
            trainer_picture=trainer_picture,
            encounter_location_img=encounter_location_img,
            encounter_location=encounter_location,
            encounter_when_raw=encounter_when,
            requirements=requirements
        )

        slug  = slugify(trainer_name)
        teams = gym_data.get(slug, {})
        base['first_match_team'] = teams.get('first_match_team', [])
        base['rematch_team']     = teams.get('rematch_team', [])

        base['badge_image'] = badge_map.get(slug)

        base['battle_schedule'] = battle_map.get(trainer_name, [])
        trainer_list.append(base)

    return trainer_list

def fetch_trainer_battle_days(soup, html):
    table = soup.find("table", id="table18")
    if not table:
        return []

    header_cells = table.find("tr").find_all("td")[1:]
    days = [cell.get_text(strip=True) for cell in header_cells]

    schedule = []
    for row in table.find_all("tr")[1:]:
        cells = row.find_all("td")
        time_of_day = cells[0].get_text(strip=True)
        for idx, cell in enumerate(cells[1:]):
            day = days[idx]
            img = cell.find("img")
            if img and img.get("src"):
                raw_url = img["src"].split("?", 1)[0]
                decoded_once = unquote(raw_url)
                decoded_full = unquote(decoded_once)
                trainer_name = Path(decoded_full).stem
            else:
                trainer_name = "N/A"
            schedule.append({
                "trainer_name": trainer_name,
                "day": day,
                "time": time_of_day
            })
    return schedule

def parse_gyms(html):
    soup = BeautifulSoup(html, 'html.parser')
    gyms = {}

    for h2 in soup.find_all('h2', id=re.compile(r'gym-\d+')):
        blocs = h2.find_next_siblings('div', class_='infocard-list-trainer-pkmn', limit=2)
        if len(blocs) < 2:
            continue

        leader_name = blocs[0].find('span', class_='ent-name').get_text(strip=True)
        key = slugify(leader_name)

        gyms[key] = {
            'leader_name': leader_name,
            'first_match_team': [],
            'rematch_team': []
        }

        for idx, bloc in enumerate(blocs):
            team_key = 'first_match_team' if idx == 0 else 'rematch_team'
            for card in bloc.find_all('div', class_='infocard trainer-pkmn'):
                pokedexNumber = card.find('small').get_text(strip=True)
                name = card.find('a', class_='ent-name').get_text(strip=True)
                level = card.find_all('small')[1].get_text(strip=True)
                types = [t.get_text(strip=True) for t in card.select('small a.itype')]
                sprite = card.find('img', class_=re.compile(r'img-sprite')).get('src')

                gyms[key][team_key].append({
                    'pokedexNumber': pokedexNumber,
                    'name': name,
                    'level': level,
                    'types': types,
                    'sprite_url': sprite
                })
    return gyms


def parse_badges(url: str):
    try:
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
    except requests.RequestException as e:
        print(f"Erro ao buscar página de badges: {e}")
        return []

    soup = BeautifulSoup(resp.text, 'html.parser')
    badges = []

    for span in soup.find_all('span', id=re.compile(r'.+_Badge')):
        tbl = span.find_next('table')
        if not tbl:
            continue

        img = tbl.find('img')
        badge_image = img['src'] if img else None

        giver_span = tbl.find('span', string=lambda t: t and t.strip() == 'Giver')
        if giver_span:
            a = giver_span.find_next('a')
            gym_leader = a.get_text(strip=True) if a else None
        else:
            gym_leader = None

        if gym_leader == "Giovanni":
            gym_leader = "Blue"

        if gym_leader == "Koga":
            gym_leader = "Janine"

        if gym_leader and badge_image:
            badges.append({
                'gym_leader': gym_leader,
                'badge_image': badge_image
            })

    return badges

def download_trainer_gif(trainer_name: str, dest_dir: str = "./src/assets/gifs") -> str | None:

    cleaned_name = trainer_name.strip()
    sanitized = re.sub(r'[^A-Za-z0-9]', '', cleaned_name)

    url = f"https://www.pokemythology.net/conteudo/detonados/hgss/{sanitized}HGSS.gif"
    os.makedirs(dest_dir, exist_ok=True)

    gif_filename = f"{sanitized}HGSS.gif"
    gif_path = os.path.join(dest_dir, gif_filename)

    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            with open(gif_path, "wb") as f:
                f.write(response.content)
            return gif_path
        else:
            print(f"[AVISO] GIF não encontrado para '{trainer_name}' (HTTP {response.status_code})")
            return None
    except requests.RequestException as e:
        print(f"[ERRO] Falha ao baixar GIF de '{trainer_name}': {e}")
        return None

def build_trainer_json(trainer_name,
                       trainer_picture,
                       encounter_location_img,
                       encounter_location,
                       encounter_when_raw,
                       requirements):
    def parse_encounter_when(text: str):
        t = text.strip()
        low = t.lower()
        if "todos os dias" in low:
            day = "todos os dias"
            if "das" in low and "às" in low:
                time = t.split("das", 1)[1].strip()
            else:
                time = "dia todo"
            return day, time
        parts = [p.strip() for p in t.split(",", 1)]
        day = parts[0]
        if len(parts) > 1:
            rest = parts[1]
            if "durante todo o dia" in rest.lower():
                time = "dia todo"
            else:
                time = rest
        else:
            time = None
        return day, time

    day, time = parse_encounter_when(encounter_when_raw)

    trainer_gif_local_path = download_trainer_gif(trainer_name)

    return {
        "trainer_name": trainer_name.strip(),
        "trainer_picture": trainer_picture.strip() if trainer_picture else None,
        "trainer_gif": f"https://www.pokemythology.net/conteudo/detonados/hgss/{trainer_name}HGSS.gif",
        "trainer_gif_local_path": trainer_gif_local_path,
        "encounter_location_img": encounter_location_img.strip() if encounter_location_img else None,
        "encounter_location": encounter_location.strip(),
        "encounter_day": day,
        "encounter_time": time,
        "requirements": requirements.strip(),
    }

def save_trainer_data_to_json(trainer_list, filename):
    target_path = Path(__file__).parent / "../assets" / filename
    target_path.parent.mkdir(parents=True, exist_ok=True)

    with open(target_path, "w", encoding="utf-8") as f:
        json.dump(trainer_list, f, indent=4, ensure_ascii=False)

    print(f"Saved {len(trainer_list)} trainer entries to {target_path}")

def initialize_trainer_data():
    trainer_data = fetch_trainer_data()
    if trainer_data:
        save_trainer_data_to_json(trainer_data, "trainer_data.json")
    else:
        print("No trainer data found.")

if __name__ == "__main__":
    initialize_pokemon_data()
    initialize_trainer_data()
    print("All data has been fetched and saved.")
