import { AttendanceCard } from '@/components/axe1/attendance-card'
import { DayView } from '@/components/axe1/day-view'
import { WeekView } from '@/components/axe1/week-view'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TODAY_DAY_INDEX, getWeekTasks } from '@/data/mock-tasks'
import { useSessionStore } from '@/store/session-store'

export function PresencePage() {
  const weekScenario = useSessionStore((s) => s.weekScenario)
  const tasks = getWeekTasks(weekScenario)
  const todayTasks = tasks.filter((t) => t.day === TODAY_DAY_INDEX)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-semibold text-foreground">Présence & tâches</h1>
        <p className="text-sm text-muted-foreground">
          Pointage de présence et organisation du travail au quotidien.
        </p>
      </div>

      <AttendanceCard />

      <Tabs defaultValue="day">
        <TabsList>
          <TabsTrigger value="day">Aujourd’hui</TabsTrigger>
          <TabsTrigger value="week">Semaine</TabsTrigger>
        </TabsList>
        <TabsContent value="day">
          <DayView tasks={todayTasks} />
        </TabsContent>
        <TabsContent value="week">
          <WeekView tasks={tasks} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
