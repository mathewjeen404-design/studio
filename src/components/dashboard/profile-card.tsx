import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AtSign, BarChart, CheckCircle, Clock } from 'lucide-react';

export function ProfileCard() {
  return (
    <Card>
      <CardHeader className="items-center text-center">
        <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
          <AvatarImage
            src="https://picsum.photos/seed/user-avatar/100/100"
            alt="User Avatar"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <CardTitle className="font-headline text-2xl">TypingMaster</CardTitle>
        <p className="text-muted-foreground">Level 12 - Word Weaver</p>
        <div className="flex gap-2 pt-2">
          <Badge variant="secondary">Pro</Badge>
          <Badge variant="outline">Streak: 12 days</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Separator className="my-4" />
        <div className="space-y-4 text-sm">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-2">
              <BarChart size={16} /> Best WPM
            </span>
            <span className="font-medium text-primary">124</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-2">
              <CheckCircle size={16} /> Average Accuracy
            </span>
            <span className="font-medium">98.2%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-2">
              <Clock size={16} /> Total Time Typing
            </span>
            <span className="font-medium">42 hours</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground flex items-center gap-2">
              <AtSign size={16} /> Words Typed
            </span>
            <span className="font-medium">250,123</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
