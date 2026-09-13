import ReloadScreen from './ReloadScreen.component';
import { runSnapshotTests, type SnapshotTestConfig } from '../../Utils/Test/Test.utils';

import type { ReloadScreenProps } from './ReloadScreen.component.types';
import type { Navigation } from '../../Types';

describe('Reload Screen Component Snapshots', () => {
  const mockNavigation: Navigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
    dispatch: jest.fn(),
    setOptions: jest.fn(),
    isFocused: jest.fn().mockReturnValue(true),
    addListener: jest.fn().mockReturnValue(jest.fn()),
  } as unknown as Navigation;

  const defaultProps: ReloadScreenProps = {
    onReload: jest.fn(),
    navigation: mockNavigation,
  };

  const configs: SnapshotTestConfig<ReloadScreenProps>[] = [
    {
      desc: 'should match snapshot with minimal required props (onReload and navigation)',
      props: defaultProps,
    },
    {
      desc: 'should match snapshot with custom title and description',
      props: {
        ...defaultProps,
        title: 'Koneksi Terputus',
        description: 'Periksa kembali jaringan internet Anda dan coba muat ulang halaman ini.',
      },
    },
    {
      desc: 'should match snapshot with custom primary button text',
      props: {
        ...defaultProps,
        buttonText: 'Coba Lagi',
      },
    },

    {
      desc: 'should match snapshot with custom lottie animation source path',
      props: {
        ...defaultProps,
        lottieSource: 'assets/animations/no-connection.json',
      },
    },
    {
      desc: 'should match snapshot with second button text and onPress handler',
      props: {
        ...defaultProps,
        secondButtonText: 'Kembali ke Beranda',
        secondButtonOnPress: jest.fn(),
      },
    },
    {
      desc: 'should match snapshot with second button text only without secondButtonOnPress',
      props: {
        ...defaultProps,
        secondButtonText: 'Bantuan',
      },
    },
    {
      desc: 'should match snapshot with all props provided',
      props: {
        onReload: jest.fn(),
        navigation: mockNavigation,
        title: 'Terjadi Kesalahan Sistem',
        description: 'Layanan kami sedang dalam pemeliharaan berkala. Silakan coba beberapa saat lagi.',
        buttonText: 'Muat Ulang Halaman',
        lottieSource: 'assets/animations/error-state.json',
        secondButtonText: 'Hubungi Customer Care',
        secondButtonOnPress: jest.fn(),
      },
    },
    {
      desc: 'should match snapshot with empty string values in optional props',
      props: {
        ...defaultProps,
        title: '',
        description: '',
        buttonText: '',
        secondButtonText: '',
      },
    },
    {
      desc: 'should match snapshot with extremely long title, description, and button labels',
      props: {
        ...defaultProps,
        title: 'Judul Error Sangat Panjang Untuk Menguji Penataan Layout Dan Wraparound Teks Pada Layar Reload',
        description: 'Deskripsi detail pesan kesalahan yang sangat panjang untuk memastikan komponen teks dapat merender beberapa baris kalimat tanpa terpotong atau merusak posisi tombol di bagian bawah.',
        buttonText: 'Muat Ulang Seluruh Data Aplikasi Sekarang',
        secondButtonText: 'Navigasi Kembali Ke Pusat Bantuan Dan Layanan Pelanggan',
        secondButtonOnPress: jest.fn(),
      },
    },
  ];

  runSnapshotTests<ReloadScreenProps>(ReloadScreen, configs);
});