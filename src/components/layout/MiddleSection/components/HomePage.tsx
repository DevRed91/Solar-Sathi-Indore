import Button from '@/components/ui/Button';
import NumberAnimation from '@/components/ui/NumberAnimation';
import useQueryParams from '@/hooks/useQueryParams';
import { useSolarState } from '@/lib/store';
import { useGetExpCenter } from '@/services/exp-center-service';
import Image from 'next/image';
import { useEffect } from 'react';

const HomePage = () => {
  const { setIsHomePage } = useSolarState();
  const { setParams } = useQueryParams();
  const getExpCenterQuery = useGetExpCenter();

  const handleExploreClick = () => {
    setIsHomePage(false);
    setParams({ country: 'India' });
  };

  useEffect(() => {
    getExpCenterQuery.mutate({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="font-dm-sans relative flex h-full flex-col items-center justify-center gap-12 text-white before:absolute before:top-50 before:z-[-1] before:h-full before:w-full before:backdrop-blur-[2px]"
      style={{ zoom: '64%' }}
    >
      <Image
        width={0}
        height={0}
        src="/icons/logo.svg"
        alt="logo"
        className="h-full max-h-[165px] w-full max-w-[240px] cursor-pointer"
        priority
      />
      <div className="flex flex-col items-center justify-center">
        <NumberAnimation
          value={
            getExpCenterQuery.isSuccess
              ? `${getExpCenterQuery.data.totalCount}`
              : '000000'
          }
        />
        <h3 className="font-poppins text-[50px] font-bold text-white">
          homes are saving with SolarSquare
        </h3>
      </div>
      <div className="relative flex flex-col items-center gap-[18px]">
        <h1 className="font-dm-sans text-9xl leading-44">
          <span className="text-secondary-500 font-bold italic">Your</span>{' '}
          <span className="font-extrabold">turn now</span>
        </h1>
        <div className="relative">
          <Button
            variant="primary"
            content="See SolarSquare Homes"
            className="animate-btn !h-fit !w-fit px-16 py-8 text-[32px]"
            onClick={handleExploreClick}
          />
          <Image
            height={0}
            width={0}
            sizes="100vw"
            src="/gifs/finger-click.gif"
            alt="finger-click-gif"
            className="absolute -top-1/6 -right-[5%] h-[250px] w-[250px] -rotate-10"
            unoptimized={true}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
