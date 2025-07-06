import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [balance, setBalance] = useState(1250);
  const [selectedCase, setSelectedCase] = useState<string | null>(null);
  const [isOpening, setIsOpening] = useState(false);
  const [lastItem, setLastItem] = useState<any>(null);
  const [inventory, setInventory] = useState([
    {
      id: 1,
      name: "Огненный меч",
      rarity: "legendary",
      price: 850,
      image: "/img/22e5fab7-e815-4ae7-bd16-79fac0156891.jpg",
    },
    {
      id: 2,
      name: "Стальной щит",
      rarity: "rare",
      price: 120,
      image: "/img/22e5fab7-e815-4ae7-bd16-79fac0156891.jpg",
    },
    {
      id: 3,
      name: "Кожаные перчатки",
      rarity: "common",
      price: 45,
      image: "/img/22e5fab7-e815-4ae7-bd16-79fac0156891.jpg",
    },
  ]);

  const cases = [
    {
      id: 1,
      name: "Легендарный кейс",
      price: 250,
      image: "/img/2df4584f-7df4-4fbe-aa02-aa67050391cf.jpg",
    },
    {
      id: 2,
      name: "Эпический кейс",
      price: 150,
      image: "/img/2df4584f-7df4-4fbe-aa02-aa67050391cf.jpg",
    },
    {
      id: 3,
      name: "Редкий кейс",
      price: 100,
      image: "/img/2df4584f-7df4-4fbe-aa02-aa67050391cf.jpg",
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "bg-gradient-to-r from-[#FDCB6E] to-[#E17055]";
      case "epic":
        return "bg-gradient-to-r from-[#FD79A8] to-[#A29BFE]";
      case "rare":
        return "bg-gradient-to-r from-[#A29BFE] to-[#74B9FF]";
      case "common":
        return "bg-gradient-to-r from-[#74B9FF] to-[#00CEC9]";
      default:
        return "bg-gray-500";
    }
  };

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case "legendary":
        return "border-[#FDCB6E] shadow-lg shadow-[#FDCB6E]/50";
      case "epic":
        return "border-[#FD79A8] shadow-lg shadow-[#FD79A8]/50";
      case "rare":
        return "border-[#A29BFE] shadow-lg shadow-[#A29BFE]/50";
      case "common":
        return "border-[#74B9FF] shadow-lg shadow-[#74B9FF]/50";
      default:
        return "border-gray-500";
    }
  };

  const openCase = (caseItem: any) => {
    if (balance < caseItem.price) return;

    setIsOpening(true);
    setBalance(balance - caseItem.price);

    setTimeout(() => {
      const rarities = ["common", "rare", "epic", "legendary"];
      const weights = [50, 30, 15, 5];
      const randomValue = Math.random() * 100;
      let cumulativeWeight = 0;
      let selectedRarity = "common";

      for (let i = 0; i < weights.length; i++) {
        cumulativeWeight += weights[i];
        if (randomValue <= cumulativeWeight) {
          selectedRarity = rarities[i];
          break;
        }
      }

      const newItem = {
        id: Date.now(),
        name: `Предмет ${selectedRarity}`,
        rarity: selectedRarity,
        price:
          selectedRarity === "legendary"
            ? 800
            : selectedRarity === "epic"
              ? 400
              : selectedRarity === "rare"
                ? 150
                : 50,
        image: "/img/22e5fab7-e815-4ae7-bd16-79fac0156891.jpg",
      };

      setLastItem(newItem);
      setInventory([...inventory, newItem]);
      setIsOpening(false);
    }, 3000);
  };

  const sellItem = (itemId: number) => {
    const item = inventory.find((i) => i.id === itemId);
    if (item) {
      setBalance(balance + item.price);
      setInventory(inventory.filter((i) => i.id !== itemId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2D3436] via-[#636E72] to-[#2D3436] text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FF6B35] to-[#6C5CE7] bg-clip-text text-transparent">
            🎮 GameCase
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full">
              <Icon name="Wallet" size={20} className="text-[#FDCB6E]" />
              <span className="font-bold text-[#FDCB6E]">{balance} ₽</span>
            </div>
            <Button className="bg-gradient-to-r from-[#FF6B35] to-[#6C5CE7] hover:from-[#E55A2B] hover:to-[#5B4FD1]">
              Пополнить
            </Button>
          </div>
        </div>

        <Tabs defaultValue="cases" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/20 border-0">
            <TabsTrigger
              value="cases"
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6B35] data-[state=active]:to-[#6C5CE7]"
            >
              <Icon name="Package" size={16} className="mr-2" />
              Кейсы
            </TabsTrigger>
            <TabsTrigger
              value="inventory"
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6B35] data-[state=active]:to-[#6C5CE7]"
            >
              <Icon name="Backpack" size={16} className="mr-2" />
              Инвентарь
            </TabsTrigger>
            <TabsTrigger
              value="upgrade"
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6B35] data-[state=active]:to-[#6C5CE7]"
            >
              <Icon name="Zap" size={16} className="mr-2" />
              Апгрейд
            </TabsTrigger>
            <TabsTrigger
              value="profile"
              className="text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#FF6B35] data-[state=active]:to-[#6C5CE7]"
            >
              <Icon name="User" size={16} className="mr-2" />
              Профиль
            </TabsTrigger>
          </TabsList>

          <TabsContent value="cases" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((caseItem) => (
                <Card
                  key={caseItem.id}
                  className="bg-black/20 border-gray-700 hover:border-[#FF6B35] transition-all duration-300 hover:shadow-lg hover:shadow-[#FF6B35]/20"
                >
                  <CardContent className="p-6">
                    <div className="aspect-square bg-gradient-to-br from-[#FF6B35] to-[#6C5CE7] rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                      <img
                        src={caseItem.image}
                        alt={caseItem.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-center">
                      {caseItem.name}
                    </h3>
                    <div className="flex justify-between items-center mb-4">
                      <Badge className="bg-gradient-to-r from-[#FDCB6E] to-[#E17055] text-black">
                        {caseItem.price} ₽
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Icon
                          name="Star"
                          size={16}
                          className="text-[#FDCB6E]"
                        />
                        <span className="text-sm text-gray-400">Премиум</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => openCase(caseItem)}
                      disabled={balance < caseItem.price || isOpening}
                      className="w-full bg-gradient-to-r from-[#FF6B35] to-[#6C5CE7] hover:from-[#E55A2B] hover:to-[#5B4FD1] disabled:opacity-50"
                    >
                      {isOpening ? (
                        <div className="flex items-center gap-2">
                          <Icon
                            name="Loader2"
                            size={16}
                            className="animate-spin"
                          />
                          Открытие...
                        </div>
                      ) : (
                        "Открыть кейс"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Opening Animation */}
            {isOpening && (
              <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-[#FF6B35] to-[#6C5CE7] rounded-full animate-pulse mb-4 mx-auto flex items-center justify-center">
                    <Icon name="Package" size={48} className="text-white" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Открываем кейс...</h2>
                  <Progress value={33} className="w-64 mx-auto" />
                </div>
              </div>
            )}

            {/* Item Result */}
            {lastItem && (
              <Card
                className={`mt-8 border-2 ${getRarityBorder(lastItem.rarity)} bg-black/20`}
              >
                <CardHeader>
                  <CardTitle className="text-center">🎉 Поздравляем!</CardTitle>
                  <CardDescription className="text-center">
                    Вы получили новый предмет!
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-lg overflow-hidden border-2 border-current">
                    <img
                      src={lastItem.image}
                      alt={lastItem.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{lastItem.name}</h3>
                  <Badge
                    className={`${getRarityColor(lastItem.rarity)} text-white`}
                  >
                    {lastItem.rarity.toUpperCase()}
                  </Badge>
                  <p className="text-lg font-bold mt-2">{lastItem.price} ₽</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="inventory" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {inventory.map((item) => (
                <Card
                  key={item.id}
                  className={`bg-black/20 border-2 ${getRarityBorder(item.rarity)} hover:scale-105 transition-all duration-300`}
                >
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-sm mb-2 text-center">
                      {item.name}
                    </h3>
                    <Badge
                      className={`w-full justify-center mb-2 ${getRarityColor(item.rarity)} text-white`}
                    >
                      {item.rarity.toUpperCase()}
                    </Badge>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-400">Цена:</span>
                      <span className="font-bold text-[#FDCB6E]">
                        {item.price} ₽
                      </span>
                    </div>
                    <Button
                      onClick={() => sellItem(item.id)}
                      size="sm"
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <Icon name="DollarSign" size={14} className="mr-1" />
                      Продать
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="upgrade" className="mt-8">
            <div className="text-center py-16">
              <Icon
                name="Zap"
                size={64}
                className="mx-auto mb-4 text-[#FF6B35]"
              />
              <h2 className="text-2xl font-bold mb-4">Система апгрейда</h2>
              <p className="text-gray-400 mb-6">
                Улучшайте свои предметы для увеличения их стоимости!
              </p>
              <Button className="bg-gradient-to-r from-[#FF6B35] to-[#6C5CE7] hover:from-[#E55A2B] hover:to-[#5B4FD1]">
                Скоро доступно
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="mt-8">
            <div className="max-w-md mx-auto">
              <Card className="bg-black/20 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-center">Профиль игрока</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B35] to-[#6C5CE7] rounded-full flex items-center justify-center">
                      <Icon name="User" size={24} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Геймер_2024</h3>
                      <p className="text-gray-400">Уровень 15</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Баланс:</span>
                      <span className="font-bold text-[#FDCB6E]">
                        {balance} ₽
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Кейсов открыто:</span>
                      <span className="font-bold">47</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Предметов получено:</span>
                      <span className="font-bold">{inventory.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Лучший дроп:</span>
                      <span className="font-bold text-[#FDCB6E]">
                        Легендарный
                      </span>
                    </div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-[#FF6B35] to-[#6C5CE7] hover:from-[#E55A2B] hover:to-[#5B4FD1]">
                    Настройки
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
