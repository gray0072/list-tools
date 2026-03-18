import { useLocation, useNavigate } from 'react-router-dom'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Toolbar from '@mui/material/Toolbar'
import MergeTypeIcon from '@mui/icons-material/MergeType'
import JoinInnerIcon from '@mui/icons-material/JoinInner'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import FilterListIcon from '@mui/icons-material/FilterList'
import TagIcon from '@mui/icons-material/Tag'
import SortIcon from '@mui/icons-material/Sort'
import FilterAltIcon from '@mui/icons-material/FilterAlt'

export const DRAWER_WIDTH = 220

const NAV_ITEMS = [
  { path: '/union', label: 'Union', Icon: MergeTypeIcon },
  { path: '/intersection', label: 'Intersection', Icon: JoinInnerIcon },
  { path: '/difference', label: 'Difference A−B', Icon: RemoveCircleOutlineIcon },
  { path: '/symmetric', label: 'Symmetric Diff', Icon: CompareArrowsIcon },
  { path: '/deduplicate', label: 'Deduplicate', Icon: FilterListIcon },
  { path: '/count', label: 'Count', Icon: TagIcon },
  { path: '/sort', label: 'Sort', Icon: SortIcon },
  { path: '/filter', label: 'Filter', Icon: FilterAltIcon },
]

interface SidebarProps {
  mobileOpen: boolean
  onMobileClose: () => void
}

function NavContent({ onClose }: { onClose: () => void }) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <>
      <Toolbar />
      <List dense sx={{ pt: 1 }}>
        {NAV_ITEMS.map(({ path, label, Icon }) => (
          <ListItem key={path} disablePadding>
            <ListItemButton
              selected={location.pathname === path}
              onClick={() => {
                navigate(path)
                onClose()
              }}
              sx={{ borderRadius: 1, mx: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Icon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{ fontSize: 14 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default function Sidebar({ mobileOpen, onMobileClose }: SidebarProps) {
  return (
    <>
      {/* Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
      >
        <NavContent onClose={onMobileClose} />
      </Drawer>

      {/* Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
      >
        <NavContent onClose={() => {}} />
      </Drawer>
    </>
  )
}
