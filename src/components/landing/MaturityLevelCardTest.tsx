import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function MaturityLevelCardTest() {
  return (
    <div className="relative flex items-center card w-full max-w-3xl h-64 overflow-hidden mx-auto my-12">
      <Card className="w-full h-full flex items-center bg-gray-100 dark:bg-gray-800 border-none">
        <div className="w-2/3 p-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white">
              Iniciante
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Começando sua jornada digital
            </p>
          </CardContent>
          <CardFooter>
            <Button>Saiba Mais</Button>
          </CardFooter>
        </div>
        <div className="w-1/3 h-full">
          <img
            src="/iniciante_digital.png"
            alt="Iniciante"
            className="w-full h-full object-cover"
          />
        </div>
      </Card>
    </div>
  );
} 