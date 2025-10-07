import { Link, Outlet } from 'react-router-dom';
import { toAbsoluteUrl } from '@/lib/helpers';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/providers/i18n-provider';
import { I18N_LANGUAGES } from '@/i18n/config';
import { FormattedMessage } from 'react-intl';


export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { currenLanguage, changeLanguage } = useLanguage();

  const handleLanguage = (lang: string) => {
    changeLanguage(lang);
  };

  return (
    <>
      <style>
        {`
          .page-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1200/bg-10-light.jpg')}');
            background-size: cover;
          }
          .dark .page-bg {
            background-image: url('${toAbsoluteUrl('/media/images/2600x1200/bg-10-dark.png')}');
          }
        `}
      </style>
      <div className="flex flex-col items-center justify-center grow bg-center bg-no-repeat page-bg">
        <div className='w-full max-w-[400px]'>
          <Card className="w-full">
            <CardContent className="p-6 flex flex-col gap-6">
              { children }

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Badge
                    variant="outline"
                    className="w-fit"
                  >
                    {currenLanguage.label}
                    <img
                      src={currenLanguage.flag}
                      className="w-3.5 h-3.5 rounded-full"
                      alt={currenLanguage.label}
                    />
                  </Badge>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="">
                  <DropdownMenuRadioGroup
                    value={currenLanguage.code}
                    onValueChange={(value) => {
                      const selectedLang = I18N_LANGUAGES.find((lang) => lang.code === value);
                      if (selectedLang) handleLanguage(selectedLang);
                    }}
                  >
                    {I18N_LANGUAGES.map((item) => (
                      <DropdownMenuRadioItem
                        key={item.code}
                        value={item.code}
                        className="flex items-center gap-2"
                      >
                        <img
                          src={item.flag}
                          className="w-4 h-4 rounded-full"
                          alt={item.label}
                        />
                        <span>{item.label}</span>
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardContent>
          </Card>
          <p className='flex flex-row-reverse p-2'>
            <Link className='text-xs'><FormattedMessage id="AUTH.PRIVACY_POLICY" /></Link>
          </p>
        </div>
        <p className='text-xs absolute bottom-10 left-0 text-center w-full' >
          © 2025 <a target='_blank' className='underline' href="https://www.belsoft.com.tr/">Belsoft.</a> <FormattedMessage id="AUTH.COPYRIGHT" />
        </p>
      </div>
    </>
  );
}