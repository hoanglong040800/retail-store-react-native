import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { GetHomeDataDto } from 'types/dto/home.dto';
import ProductCarouselRow from './ProductCarouselRow';

type Props = {
  style?: StyleProp<ViewStyle>;
};

const PromoProductSection = ({ style }: Props) => {
  const mockData: GetHomeDataDto = {
    productCarousels: [
      {
        category: {
          id: '3471f3c3-ee36-488a-ba44-4142e4f8b4a4',
          name: 'Thịt heo',
          level: 2,
          icon: 'https://cdn.tgdd.vn/Products/Images/8781/bhx/icon_8781.png',
          isLeaf: true,
          displayOrder: 0,
        },
        products: [
          {
            id: '2df5e900-9a5e-4eb9-b5f6-335bf60d160c',
            name: 'Ba rọi heo',
            price: 184000,
            image: 'https://cdn.tgdd.vn/Products/Images/8781/226834/bhx/ba-roi-heo-202405241058549673_300x300.jpg',
            unit: null,
          },
          {
            id: 'ec3c3ea9-d154-405f-bdab-5ac7631ec6b8',
            name: 'Sườn non heo',
            price: 218000,
            image: 'https://cdn.tgdd.vn/Products/Images/8781/226856/bhx/suon-non-heo-202405241343108774_300x300.jpg',
            unit: null,
          },
          {
            id: '1413f06c-bf62-4d6f-94ee-57baa025f4d8',
            name: 'Sườn non heo nhập khẩu',
            price: 153000,
            image:
              'https://cdn.tgdd.vn/Products/Images/8781/233756/bhx/suon-non-heo-nhap-khau-202405101512269660_300x300.jpg',
            unit: null,
          },
          {
            id: 'efdfdde5-c1f6-4ed9-9911-d85da4108002',
            name: 'Ba rọi heo nhập khẩu 2kg',
            price: 264000,
            image:
              'https://cdn.tgdd.vn/Products/Images/8781/226871/bhx/ba-roi-heo-nhap-khau-2kg-202406041133287123.jpg',
            unit: null,
          },
          {
            id: '602056c0-9319-41b5-83f6-888060977634',
            name: 'Sườn cốt lết',
            price: 143000,
            image: 'https://cdn.tgdd.vn/Products/Images/8781/226937/bhx/suon-cot-let-202405241059308041_300x300.jpg',
            unit: null,
          },
          {
            id: '487fe071-b176-435c-b5cc-3004ff3a28e4',
            name: 'Thăn chuột heo',
            price: 155000,
            image: 'https://cdn.tgdd.vn/Products/Images/8781/233785/bhx/than-chuot-heo-202405241344430095_300x300.jpg',
            unit: null,
          },
          {
            id: 'fe252899-c02a-4745-a891-c7be40a19538',
            name: 'Bẹ sườn non heo nhập khẩu 3kg',
            price: 456000,
            image:
              'https://cdn.tgdd.vn/Products/Images/8781/235871/bhx/be-suon-non-heo-nhap-khau-3kg-202406041134597820.jpg',
            unit: null,
          },
          {
            id: '92d0fc54-52c0-4240-8364-ed463d1b14d6',
            name: 'Bẹ sườn non heo nhập khẩu 6kg',
            price: 912000,
            image:
              'https://cdn.tgdd.vn/Products/Images/8781/223376/bhx/be-suon-non-heo-nhap-khau-6kg-202406041135348780.jpg',
            unit: null,
          },
        ],
      },
      {
        category: {
          id: '08e0dd3c-a12f-48e1-a61e-3848391c68bd',
          name: 'Thịt bò',
          level: 2,
          icon: 'https://cdn.tgdd.vn/Products/Images/8139/bhx/thit-bo-cac-loai-202212051413547147.png',
          isLeaf: true,
          displayOrder: 1,
        },
        products: [
          {
            id: '5a08f292-cf7e-4e38-b059-16e027b0cdec',
            name: 'Nạm bò',
            price: 199000,
            image: 'https://cdn.tgdd.vn/Products/Images/8139/238859/bhx/-202405211536391674.jpg',
            unit: null,
          },
          {
            id: 'e73a9ada-0500-4191-aba3-836705a773cf',
            name: 'Thịt vụn bò',
            price: 159000,
            image: 'https://cdn.tgdd.vn/Products/Images/8139/309116/bhx/-202405211538570576.jpg',
            unit: null,
          },
          {
            id: '08aa9afa-c920-4278-9cb6-c85f8e24fa3c',
            name: 'Đùi bò',
            price: 265000,
            image: 'https://cdn.tgdd.vn/Products/Images/8139/233807/bhx/-202405211537465230.jpg',
            unit: null,
          },
          {
            id: 'c2c341c1-a254-4f7a-90a0-80c3b2c0f569',
            name: 'Bò viên Tân Việt Sin gói 200g',
            price: 54000,
            image:
              'https://cdn.tgdd.vn/Products/Images/7170/229138/bhx/bo-vien-tan-viet-sin-goi-200g-202403141419267695_300x300.jpg',
            unit: null,
          },
        ],
      },
    ],
  };

  return (
    <View style={[styles.container, style]}>
      {mockData.productCarousels.map(productCate => (
        <ProductCarouselRow key={productCate.category.id} productCate={productCate} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
  },
});

export default PromoProductSection;
