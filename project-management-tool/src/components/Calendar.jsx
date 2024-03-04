import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import { cn } from '../lib/utils'
import { Button } from './ui/button'
import { Calendar as CalendarCN } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

const Calendar = ({ value, onChange }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn('pl-3 text-left font-normal', !value && 'text-muted-foreground')}
        >
          {value ? format(value, 'PPP') : <span>Pick a date</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <CalendarCN
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={(date) => date < new Date('1900-01-01')}
        />
      </PopoverContent>
    </Popover>
  )
}

export default Calendar
