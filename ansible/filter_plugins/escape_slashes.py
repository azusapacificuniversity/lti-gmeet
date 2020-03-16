#!/usr/bin/python

class FilterModule(object):
    def filters(self):
        return {
            'escape_slashes': self.escape_slashes
        }

    def escape_slashes(self, var):
        return var.replace('\n', '\\n')
