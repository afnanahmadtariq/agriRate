import ModernButton from './components/ModernButton';
import ModernCard from './components/ModernCard';
import StatusBadge from './components/StatusBadge';
import ProgressiveDisclosure from './components/ProgressiveDisclosure';

export default function Home() {
  return (
    <div>
      <h1>Welcome to AgriRate</h1>
      <ModernButton label="Get Started" />
      <ModernCard title="Featured Product" description="This is a featured product." />
      <StatusBadge status="success" />
      <ProgressiveDisclosure title="More Info" content="Here is some more information." />
    </div>
  );
}