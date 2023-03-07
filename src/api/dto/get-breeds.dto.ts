export type GetBreedsDto = Breed[];

interface Breed {
  weight: Weight;
  height: Height;
  id: number;
  name: string;
  bred_for: string;
  breed_group: string;
  life_span: string;
  temperament: string;
  reference_image_id: string;
  image: Image;
}

interface Weight {
  imperial: string;
  metric: string;
}

interface Height {
  imperial: string;
  metric: string;
}

interface Image {
  id: string;
  width: number;
  height: number;
  url: string;
}
