import type { Character } from "@/types/Character";
import { useEffect, useState } from "react";
// import { getList } from "@/api/home";
import CommonButton from "@/components/Common/Button";
import IconStar from "@/assets/svg/IconStar.svg?react";
import { useTranslation } from "react-i18next";
import CharacterSwiper from "./modules/CharacterSwiper";

import CharacterSlider from "./modules/CharacterSlider";

// Local demo videos
import v1 from "@/assets/videos/home_list_1.mp4";
import v2 from "@/assets/videos/home_list_2.mp4";
import v3 from "@/assets/videos/home_list_3.mp4";
import v4 from "@/assets/videos/home_list_4.mp4";
import v5 from "@/assets/videos/home_list_5.mp4";
import v6 from "@/assets/videos/home_list_6.mp4";
import v7 from "@/assets/videos/home_list_7.mp4";

// Local demo images (Rectangle series)
import img_34624891 from "@/assets/images/Rectangle 34624891.png";
import img_34624892 from "@/assets/images/Rectangle 34624892.png";
import img_34624893 from "@/assets/images/Rectangle 34624893.png";
import img_34624897 from "@/assets/images/Rectangle 34624897.png";
import img_34624899 from "@/assets/images/Rectangle 34624899.png";
import img_34624902 from "@/assets/images/Rectangle 34624902.png";
import img_34624903 from "@/assets/images/Rectangle 34624903.png";
import img_34624904 from "@/assets/images/Rectangle 34624904.png";
import img_34624905 from "@/assets/images/Rectangle 34624905.png";
import img_34624906 from "@/assets/images/Rectangle 34624906.png";
import img_34624907 from "@/assets/images/Rectangle 34624907.png";
import img_34624908 from "@/assets/images/Rectangle 34624908.png";
import img_34624909 from "@/assets/images/Rectangle 34624909.png";
import img_34624910 from "@/assets/images/Rectangle 34624910.png";

const HomePage = () => {
  const { t } = useTranslation();
  const [characterList, setCharacterList] = useState<Character[]>([]);
  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(
    null
  );
  useEffect(() => {
    const images = [
      img_34624891,
      img_34624892,
      img_34624893,
      img_34624897,
      img_34624899,
      img_34624902,
      img_34624903,
      img_34624904,
      img_34624905,
      img_34624906,
      img_34624907,
      img_34624908,
      img_34624909,
      img_34624910,
    ];
    const videos = [v1, v2, v3, v4, v5, v6, v7];
    const names = [
      "Alice",
      "John",
      "Sarah",
      "David",
      "Emily",
      "Daniel",
      "Sophia",
      "Liam",
      "Olivia",
      "Noah",
      "Ava",
      "Ethan",
      "Mia",
      "Lucas",
      "Emma",
      "James",
      "Chloe",
    ];
    const now = 1732000000;

    const list: Character[] = images.map((img, idx) => {
      const id = (idx + 1).toString();
      const name = names[idx % names.length];
      const voice = videos[Math.floor(Math.random() * videos.length)];
      const tsBase = now - idx * 86400;
      return {
        id,
        name,
        description: `${name} — a friendly companion with unique stories.a friendly companion with unique stories.a friendly companion with unique stories.a friendly companion with unique stories.a friendly companion with unique stories.a friendly companion with unique stories.a friendly companion with unique stories.a friendly companion with unique stories.a friendly companion with unique stories.a friendly companion with unique stories.a friendly companion with unique stories.a friendly companion with unique stories.a friendly companion with unique stories.a friendly companion with unique stories.a friendly companion with unique stories.`,
        image: img,
        voice,
        userInfo: {
          id: `u_${1001 + idx}`,
          nickname: name,
          username: name.toLowerCase(),
          email: `${name.toLowerCase()}@example.com`,
          avatar_url: `https://i.pravatar.cc/100?img=${(idx % 70) + 1}`,
          status: "active",
          phone: "13800000000",
          login_type: "email",
          login_identifier: `${name.toLowerCase()}@example.com`,
          last_login_at: tsBase,
          last_login_ip: "203.0.113.10",
          created_at: tsBase - 86400 * 30,
          updated_at: tsBase - 86400 * 3,
        },
        created_at: new Date((tsBase - 86400 * 60) * 1000).toISOString(),
        updated_at: new Date((tsBase - 86400 * 2) * 1000).toISOString(),
      };
    });

    setCharacterList(list);
    setCurrentCharacter(list[0]);
  }, []);

  return (
    <div className="w-full h-full min-w-[800px] flex flex-col justify-between items-center home-container relative">
      {/** 角色列表 */}
      <div className="flex-1 w-full h-full ">
        <CharacterSwiper
          characterList={characterList}
          currentCharacter={currentCharacter}
          changeCharacter={setCurrentCharacter}
        />
      </div>
      {/** 侧边栏   */}
      <div className="absolute top-[50%] translate-y-[-50%] right-5 h-[512px] w-20 ">
        <CharacterSlider
          characterList={characterList}
          currentCharacter={currentCharacter}
          changeCharacter={setCurrentCharacter}
        />
      </div>
      {/** 创建新角色按钮 */}
      <div className="h-16 my-4">
        <CommonButton
          size="large"
          className="py-4 h-16 px-0"
          borderRadiusPx={54}
        >
          <span className="text-xl font-medium text-[#333] flex items-center gap-4 justify-center px-10">
            {t("home.create_new_character")}
            <IconStar className="w-6 h-6" />
          </span>
        </CommonButton>
      </div>
    </div>
  );
};

export default HomePage;
