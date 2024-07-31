import { getWidgetByName } from "@/shared/lib/utils";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
  Dialog,
  DialogHeader,
  DialogTrigger,
} from "@/shared/ui";
import { Image as ImageIcon } from "lucide-react";
interface PreviewButtonProps {
  modal: string;
}
const mockProps = {
  Info: {
    options:
      '{"title":"We prepare today’s learners for tomorrow’s world of work","content":"Our mission is to provide people with access to digitally-enhanced capacity development services to successfully manage their future of work transitions. From our sustainability-minded courses to our SDG-informed Masters, we always put our participants first.","items":[{"title":"Hundreds of courses","content":"The Centre leverages global alliances and partnerships to deliver training activities.  Courses cover topics like employment promotion, international labour standards, social protection, social dialogue, innovation, gender equality and diversity, sustainable development, and the future of work.  We offer academies, standard courses, free self-paced courses, and Masters. You can also search by topic, language, and mode (online, face-to-face, or blended).","image":"uploads/20240725110251.jpeg","imagePosition":"right","linkText":"See more","savedTemplate":"Main-carousel","templateWidgets":"[\\"Text\\",\\"Carousel\\"]","href":"/template-1721905318844","templateSlug":"/template-1721905318844","templateId":"633*634"}]}',
  },
  Links: {
    options:
      '{"title":"Нормативные правовые акты","items":[{"name":"Трудовой кодекс Республики Казахстан","link":"https://adilet.zan.kz/rus/docs/K1500000414","image":"","href":"/template-1721815109111","templateId":"574*575","templateName":null},{"name":"Закон РК \\"О профессиональных союзах\\"","link":"https://adilet.zan.kz/rus/docs/Z1400000211","image":"","href":"/template-1721815182890","templateId":"576*577","templateName":null}]}',
  },
  Cards: {
    options:
      '{"variant":"horizontal","title":"123","items":[{"title":"123","content":"1test223","image":"uploads/20240729115725.webp","href":"","templateSlug":"/template-1722254220633","templateId":"679*680"},{"title":"123","content":"123","image":"uploads/20240730103228.jpeg","href":"","templateSlug":"/template-1722335539079","templateId":"683*684"}]}',
  },
  Carousel: {
    options:
      '{"items":[{"content":"123","image":"","savedTemplate":"cards-carousel","templateWidgets":"[\\"Cards\\",\\"Carousel\\"]","href":"/template-1722245789831","templateSlug":"/template-1722245789831","templateId":"657*658"}]}',
  },
  Text: {
    options:
      '{"heading":"123","content":"<p>321</p>","items":[],"language_key":"ru","navigation_id":635}',
  },
  Accordion: {
    options:
      '{"items":[{"question":"1","answer":"321","href":"","templateId":"1722249090179"},{"question":"2","answer":"12","href":"","templateId":"1722252685064"},{"question":"3","answer":"123","href":"","templateId":"1722320426608"}]}',
  },
  List: {
    options:
      '{"items":[{"content":"1","file":"uploads/20240729111110.pdf","href":"","templateId":"1722251456243"},{"content":"2","file":"uploads/20240729111459.pdf","href":"","templateId":"1722251686088"}]}',
  },
  Gallery: {
    options:
      '{"items":[{"image":"uploads/20240730103121.jpeg","href":"","templateId":"1722335477257"},{"image":"uploads/20240730103159.jpeg","href":"","templateId":"1722335515681"},{"image":"uploads/20240730105253.jpeg","href":"","templateId":"1722336769691"},{"image":"uploads/20240730110637.webp","href":"","templateId":"1722337591559"},{"image":"uploads/20240730111652.webp","href":"","templateId":"1722338200944"},{"image":"uploads/20240730111740.jpeg","href":"","templateId":"1722338252393"},{"image":"uploads/20240730111740.webp","href":"","templateId":"1722338256197"}]}',
  },
};
export const PreviewButton = ({ modal }: PreviewButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger className="bg-black rounded-md px-3">
        <ImageIcon color="white" />
      </DialogTrigger>
      <DialogContent className="h-[calc(100svh-200px)] min-w-[calc(100vw-100px)]">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Предпросмотр виджета {modal}
          </DialogTitle>
          <DialogDescription className="">
            Здесь вы можете посмотреть как выглядит виджет
          </DialogDescription>
        </DialogHeader>
        <div className="max-w-[1200px] w-full mx-auto">
          {getWidgetByName(
            modal,
            JSON.parse(mockProps[modal as keyof typeof mockProps].options),
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
