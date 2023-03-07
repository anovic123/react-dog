export type GetSingleDogDto = Dog;

interface Dog {
  id: string;
  url: string;
  breeds: Breed[];
  width: number;
  height: number;
}
interface Weight {
  imperial: string;
  metric: string;
}

interface Height {
  imperial: string;
  metric: string;
}

interface Breed {
  weight: Weight;
  height: Height;
  id: number;
  name: string;
  country_code: string;
  bred_for: string;
  breed_group: string;
  life_span: string;
  temperament: string;
  reference_image_id: string;
}
