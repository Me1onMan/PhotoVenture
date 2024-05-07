import EMOTIONS from '@/constants/emotions';

import EmotionElement from './EmotionElement';

const EmotionsFilter = () => {
  return (
    <div>
      {EMOTIONS.map((emotion) => (
        <EmotionElement key={emotion} emotion={emotion} />
      ))}
    </div>
  );
};

export default EmotionsFilter;
